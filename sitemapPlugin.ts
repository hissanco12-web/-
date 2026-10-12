/**
 * يولّد sitemap.xml و robots.txt تلقائياً عند البناء (npm run build).
 *
 * رابط الموقع يُؤخذ بالترتيب من:
 *   1. SITE_URL           (ضعه يدوياً في إعدادات Netlify/Vercel إذا كان لديك نطاق خاص)
 *   2. URL                (يضيفه Netlify تلقائياً)
 *   3. VERCEL_PROJECT_PRODUCTION_URL (يضيفه Vercel تلقائياً)
 *
 * روابط المنتجات والمجموعات تُقرأ من Firestore (siteContent/public) وقت البناء،
 * وإذا تعذر ذلك تُستخدم البيانات الافتراضية في src/data/initialData.ts.
 * ملاحظة: المنتجات الجديدة تظهر في الخريطة بعد أول نشر (Deploy) جديد للموقع.
 */
import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { initialCMSData } from './src/data/initialData';

const FIREBASE_PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'kingofline-a2d40';

const STATIC_PAGES = [
  '',
  'products',
  'collections',
  'services',
  'about',
  'gallery',
  'articles',
  'offers',
  'contact',
  'privacy',
  'terms',
];

function resolveSiteUrl(): string | null {
  const raw =
    process.env.SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '');
  if (!raw) return null;
  return raw.replace(/\/+$/, '');
}

type SlugLists = { products: string[]; collections: string[] };

/** يقرأ slugs المنتجات والمجموعات من وثيقة Firestore العامة عبر REST. */
async function fetchLiveSlugs(): Promise<SlugLists | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/siteContent/public`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      fields?: Record<string, { arrayValue?: { values?: { mapValue?: { fields?: { slug?: { stringValue?: string } } } }[] } }>;
    };
    const pick = (key: string) =>
      (json.fields?.[key]?.arrayValue?.values || [])
        .map((v) => v.mapValue?.fields?.slug?.stringValue)
        .filter((s): s is string => Boolean(s));
    const products = pick('products');
    const collections = pick('collections');
    if (products.length === 0 && collections.length === 0) return null;
    return { products, collections };
  } catch {
    return null;
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(siteUrl: string, slugs: SlugLists): string {
  const today = new Date().toISOString().slice(0, 10);
  const paths = [
    ...STATIC_PAGES,
    ...slugs.products.map((s) => `products/${encodeURIComponent(s)}`),
    ...slugs.collections.map((s) => `collections/${encodeURIComponent(s)}`),
  ];
  const entries = paths.map((p) => {
    const suffix = p ? `/${p}` : '';
    const ar = `${siteUrl}/ar${suffix}`;
    const en = `${siteUrl}/en${suffix}`;
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(ar)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(ar)}"/>`,
    ].join('\n');
    return [ar, en]
      .map(
        (loc) =>
          `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`
      )
      .join('\n');
  });
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.join('\n') +
    '\n</urlset>\n'
  );
}

function buildRobots(siteUrl: string | null): string {
  return (
    'User-agent: *\n' +
    'Allow: /\n' +
    'Disallow: /admin\n' +
    (siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : '')
  );
}

export function sitemapPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'kingsmen-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const siteUrl = resolveSiteUrl();
      fs.writeFileSync(path.join(outDir, 'robots.txt'), buildRobots(siteUrl));
      if (!siteUrl) {
        console.warn('[sitemap] SITE_URL/URL غير محدد — تم تخطي sitemap.xml (يُولَّد تلقائياً على Netlify/Vercel).');
        return;
      }
      const live = await fetchLiveSlugs();
      const slugs: SlugLists = live || {
        products: initialCMSData.products.map((p) => p.slug),
        collections: initialCMSData.collections.map((c) => c.slug),
      };
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap(siteUrl, slugs));
      console.log(
        `[sitemap] ${siteUrl}/sitemap.xml — ${slugs.products.length} منتج، ${slugs.collections.length} مجموعة (${live ? 'من Firestore' : 'من البيانات الافتراضية'})`
      );
    },
  };
}
