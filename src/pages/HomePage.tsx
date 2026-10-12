import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Shield, Sparkles, Award } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { buildWhatsAppLink, t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ResilientImage } from '../components/common/ResilientImage';
import { ProductCard } from '../components/product/ProductCard';
import { initialCMSData } from '../data/initialData';

export const HomePage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const common = uiStrings[lang].common;
  const { hero, craftsmanshipBanner } = data.settings;
  const homeSections =
    data.settings.homeSections || initialCMSData.settings.homeSections!;

  const featuredProducts = data.products.filter((p) => p.featured);
  const featuredCollections = data.collections.filter((c) => c.featured !== false);

  const whatsappHref = buildWhatsAppLink(
    data.settings.whatsappNumber,
    lang === 'ar'
      ? `مرحباً دار ${data.settings.brandName}، أود حجز موعد استشارة خاصة.`
      : `Hello ${data.settings.brandName}, I would like to book a private bespoke consultation.`
  );

  const pillarIcons = [
    <Award key="0" className="w-6 h-6 text-[#C9A24A] shrink-0 mt-1" />,
    <Sparkles key="1" className="w-6 h-6 text-[#C9A24A] shrink-0 mt-1" />,
    <Shield key="2" className="w-6 h-6 text-[#C9A24A] shrink-0 mt-1" />,
  ];

  return (
    <>
      <SEOHead
        lang={lang}
        title={`${data.settings.brandName} — ${t(data.settings.tagline, lang)}`}
        description={t(hero.subtitle, lang)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-[#C9A24A]/20">
        <div className="absolute inset-0">
          <ResilientImage
            src={hero.image}
            alt={t(hero.title, lang)}
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/85 to-[#090909]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111]/90 border border-[#C9A24A]/40 text-[#C9A24A] text-xs uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t(hero.eyebrow, lang)}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F7F7F5] leading-[1.15]">
              {t(hero.title, lang)}
            </h1>

            <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
              {t(hero.subtitle, lang)}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/${lang}/products`}
                className="px-7 py-4 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs uppercase tracking-[0.18em] transition-colors"
              >
                {t(hero.primaryCta, lang)}
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#111111]/90 hover:border-[#C9A24A] border border-white/20 text-[#F7F7F5] text-xs uppercase tracking-[0.18em] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A24A]" />
                <span>{t(hero.secondaryCta, lang)}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      {homeSections.showPillars && (
        <section className="border-b border-white/10 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeSections.pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {pillarIcons[idx % pillarIcons.length]}
                <div>
                  <h3 className="font-editorial text-lg text-[#F7F7F5]">
                    {t(pillar.title, lang)}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed">
                    {t(pillar.description, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Collections */}
      {homeSections.showCollections && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
                {t(homeSections.collectionsEyebrow, lang)}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F7F5] mt-2">
                {t(homeSections.collectionsTitle, lang)}
              </h2>
            </div>
            <Link
              to={`/${lang}/collections`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#C9A24A] hover:underline"
            >
              <span>{common.exploreCollection}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((col) => (
              <Link
                key={col.id}
                to={`/${lang}/collections/${col.slug}`}
                className="group relative aspect-[4/5] overflow-hidden border border-white/10 hover:border-[#C9A24A] block"
              >
                <ResilientImage
                  src={col.image}
                  alt={t(col.title, lang)}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24A]">
                    {t(col.season, lang)}
                  </span>
                  <h3 className="font-editorial text-2xl text-[#F7F7F5] group-hover:text-[#C9A24A] transition-colors">
                    {t(col.title, lang)}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2">
                    {t(col.subtitle, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {homeSections.showFeaturedProducts && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
                {t(homeSections.productsEyebrow, lang)}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F7F5] mt-2">
                {t(homeSections.productsTitle, lang)}
              </h2>
            </div>
            <Link
              to={`/${lang}/products`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#C9A24A] hover:underline"
            >
              <span>{uiStrings[lang].nav.products}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* Craftsmanship Banner */}
      {homeSections.showCraftsmanshipBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#C9A24A]/30 bg-[#111111] overflow-hidden">
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
                {t(craftsmanshipBanner.eyebrow, lang)}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F7F5] leading-tight">
                {t(craftsmanshipBanner.title, lang)}
              </h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                {t(craftsmanshipBanner.description, lang)}
              </p>
              <div className="pt-2">
                <Link
                  to={`/${lang}/services`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A24A] text-[#090909] font-semibold text-xs uppercase tracking-[0.16em]"
                >
                  <span>{common.bespokeServices}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 min-h-[340px]">
              <ResilientImage
                src={craftsmanshipBanner.image}
                alt={t(craftsmanshipBanner.title, lang)}
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
