# KINGSMEN LINE

Luxury bilingual React/Vite storefront (`ar` RTL & `en` LTR) with a comprehensive private Atelier Admin Command Center (`/admin`).

## Architecture & Features
- **Public Storefront**: React 19 + Vite + React Router (`/ar` & `/en`)
- **Admin Command Center (`/admin`)**:
  - Brand Identity & Direct WhatsApp Concierge settings
  - Full SEO & Meta Tags control (Title, Description, Keywords, OpenGraph Share Image)
  - Social Media & Google Maps links (`Instagram`, `Snapchat`, `TikTok`, `X`, `Facebook`, `YouTube`, `Google Maps`)
  - Live Royal Theme & Color Customizer (4 presets + custom hex pickers)
  - Direct Mobile/Desktop Image Replacement (`ImageReplacer`) across Hero, Craftsmanship Banner, Products, Collections, Services, Offers, Gallery, and Articles
  - Full JSON Backup Export & Restore
- **Firebase Connection**:
  - Project: `kingofline-a2d40`
  - Auth: Firebase Authentication (`/admins/{uid}`)
  - Firestore CMS: `siteContent/public`
  - Storage: `media/public/{category}/{fileName}` with automatic client-side image compression fallback
- **Deployment Ready**: Configured for both Vercel (`vercel.json`) and Netlify (`netlify.toml` & `public/_redirects`).

## التشغيل والنشر

```bash
npm install      # Node 24
npm run dev      # تطوير محلي على المنفذ 3000
npm run lint     # فحص TypeScript
npm run build    # بناء الإنتاج إلى dist/ (يولّد sitemap.xml و robots.txt)
```

- **Netlify / Vercel**: يكفي ربط المستودع؛ الإعدادات في `netlify.toml` و `vercel.json`.
- **Google Search Console**: ملف التحقق `public/google586ac00d1b2618e3.html`، وخريطة الموقع على `/sitemap.xml`.
- **إعداد Firebase ولوحة التحكم ونشر قواعد الحماية**: راجع [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md).
