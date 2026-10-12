import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Language, Product } from '../../types/cms';
import { buildWhatsAppLink, t, uiStrings } from '../../lib/i18n';
import { useCMS } from '../../context/CMSContext';
import { ResilientImage } from '../common/ResilientImage';

export const ProductCard: React.FC<{
  product: Product;
  lang: Language;
}> = ({ product, lang }) => {
  const { data } = useCMS();
  const common = uiStrings[lang].common;

  const whatsappHref = buildWhatsAppLink(
    data.settings.whatsappNumber,
    lang === 'ar'
      ? `مرحباً ${data.settings.brandName}، أود الاستفسار عن قطعة: ${t(product.name, 'ar')} (${t(product.price, 'ar')})`
      : `Hello ${data.settings.brandName}, I would like to inquire about: ${t(product.name, 'en')} (${t(product.price, 'en')})`
  );

  return (
    <div className="group bg-[#111111] border border-white/10 hover:border-[#C9A24A]/60 transition-all duration-500 flex flex-col">
      <Link
        to={`/${lang}/products/${product.slug}`}
        className="relative aspect-[3/4] overflow-hidden block"
      >
        <ResilientImage
          src={product.image}
          alt={t(product.name, lang)}
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-70" />
        {product.badge && (
          <span className="absolute top-4 start-4 px-3 py-1 bg-[#090909]/90 border border-[#C9A24A]/50 text-[#C9A24A] text-[11px] uppercase tracking-[0.14em]">
            {t(product.badge, lang)}
          </span>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#C9A24A]">
            {product.category}
          </div>
          <Link
            to={`/${lang}/products/${product.slug}`}
            className="block font-editorial text-xl text-[#F7F7F5] group-hover:text-[#C9A24A] transition-colors"
          >
            {t(product.name, lang)}
          </Link>
          <p className="text-xs text-[#A3A3A3] line-clamp-2">
            {t(product.subtitle, lang)}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#E0C878]">
              {t(product.price, lang)}
            </span>
            <Link
              to={`/${lang}/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-[#F7F7F5] hover:text-[#C9A24A]"
            >
              <span>{common.viewDetails}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C9A24A]/15 hover:bg-[#C9A24A] text-[#C9A24A] hover:text-[#090909] border border-[#C9A24A]/40 text-xs uppercase tracking-[0.14em] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{common.inquireWhatsapp}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
