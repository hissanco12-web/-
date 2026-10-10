import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ResilientImage } from '../components/common/ResilientImage';

export const CollectionsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;
  const common = uiStrings[lang].common;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.collections} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.collections}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.collections.map((col) => (
          <Link
            key={col.id}
            to={`/${lang}/collections/${col.slug}`}
            className="group bg-[#111111] border border-white/10 hover:border-[#C9A24A] transition-colors flex flex-col overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <ResilientImage
                src={col.image}
                alt={t(col.title, lang)}
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24A]">
                  {t(col.season, lang)}
                </span>
                <h2 className="font-editorial text-2xl text-[#F7F7F5] group-hover:text-[#C9A24A] transition-colors">
                  {t(col.title, lang)}
                </h2>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {t(col.description, lang)}
                </p>
              </div>
              <div className="pt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#C9A24A]">
                <span>{common.exploreCollection}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
