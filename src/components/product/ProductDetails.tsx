import React, { useState } from 'react';
import { MessageCircle, Share2, ShieldCheck, Sparkles, Clock, Globe2 } from 'lucide-react';
import { Language, Product } from '../../types/cms';
import { buildWhatsAppLink, t, uiStrings } from '../../lib/i18n';
import { useCMS } from '../../context/CMSContext';
import { ResilientImage } from '../common/ResilientImage';
import { ShareModal } from './ShareModal';

export const ProductDetails: React.FC<{
  product: Product;
  lang: Language;
}> = ({ product, lang }) => {
  const { data } = useCMS();
  const common = uiStrings[lang].common;
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [shareOpen, setShareOpen] = useState(false);

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const whatsappHref = buildWhatsAppLink(
    data.settings.whatsappNumber,
    lang === 'ar'
      ? `مرحباً دار ${data.settings.brandName}، أرغب في طلب تفصيل قطعة "${t(product.name, 'ar')}" (${t(product.price, 'ar')}) وحجز موعد لأخذ القياسات.`
      : `Hello ${data.settings.brandName}, I would like to commission "${t(product.name, 'en')}" (${t(product.price, 'en')}) and schedule a private fitting.`
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-7 space-y-4">
        <div className="aspect-[4/5] border border-white/10 overflow-hidden bg-[#111111]">
          <ResilientImage
            src={selectedImage || product.image}
            alt={t(product.name, lang)}
            className="w-full h-full"
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`aspect-square border overflow-hidden ${
                  selectedImage === img ? 'border-[#C9A24A]' : 'border-white/10 opacity-70'
                }`}
              >
                <ResilientImage src={img} alt="" className="w-full h-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-5 space-y-8 bg-[#111111] border border-white/10 p-6 sm:p-8">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
              {product.category}
            </span>
            {product.badge && (
              <span className="px-2.5 py-1 bg-[#C9A24A]/15 border border-[#C9A24A]/40 text-[#C9A24A] text-[11px]">
                {t(product.badge, lang)}
              </span>
            )}
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl text-[#F7F7F5]">
            {t(product.name, lang)}
          </h1>
          <p className="text-sm text-[#A3A3A3]">{t(product.subtitle, lang)}</p>
          <div className="pt-2 text-xl font-medium text-[#E0C878]">
            {t(product.price, lang)}
          </div>
        </div>

        <p className="text-sm text-[#F7F7F5]/90 leading-relaxed">
          {t(product.description, lang)}
        </p>

        <div className="grid grid-cols-1 gap-4 bg-[#090909] p-4 border border-white/10 text-xs">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#A3A3A3] block">{common.fabric}</span>
              <span className="text-[#F7F7F5] font-medium">{t(product.fabric, lang)}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe2 className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#A3A3A3] block">{common.origin}</span>
              <span className="text-[#F7F7F5] font-medium">{t(product.origin, lang)}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#A3A3A3] block">{common.leadTime}</span>
              <span className="text-[#F7F7F5] font-medium">{t(product.leadTime, lang)}</span>
            </div>
          </div>
        </div>

        {product.features && product.features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#C9A24A]">
              {common.specifications}
            </h3>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                  <span>{t(feat, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs uppercase tracking-[0.16em] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{common.bookAppointment}</span>
          </a>

          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 border border-white/15 hover:border-[#C9A24A] text-xs uppercase tracking-[0.15em] text-[#F7F7F5] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>{common.sharePiece}</span>
          </button>

          <p className="text-[11px] text-[#A3A3A3] text-center leading-relaxed">
            {common.conciergeNote}
          </p>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={t(product.name, lang)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        lang={lang}
      />
    </div>
  );
};
