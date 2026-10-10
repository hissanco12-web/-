import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { buildWhatsAppLink, t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ResilientImage } from '../components/common/ResilientImage';

export const GalleryPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.gallery} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.gallery}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {data.gallery.map((item) => (
          <div
            key={item.id}
            className="bg-[#111111] border border-white/10 overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <ResilientImage
                src={item.image}
                alt={t(item.title, lang)}
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#C9A24A]">
                {t(item.category, lang)}
              </span>
              <h2 className="font-editorial text-2xl text-[#F7F7F5]">
                {t(item.title, lang)}
              </h2>
              <p className="text-xs text-[#A3A3A3]">{t(item.caption, lang)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArticlesPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.articles} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.articles}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.articles.map((article) => (
          <article
            key={article.id}
            className="bg-[#111111] border border-white/10 overflow-hidden flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <ResilientImage
                src={article.image}
                alt={t(article.title, lang)}
                className="w-full h-full"
              />
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#C9A24A]">
                  <span>{t(article.category, lang)}</span>
                  <span className="text-[#A3A3A3]">{t(article.readTime, lang)}</span>
                </div>
                <h2 className="font-editorial text-2xl text-[#F7F7F5]">
                  {t(article.title, lang)}
                </h2>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {t(article.excerpt, lang)}
                </p>
                <p className="text-sm text-[#F7F7F5]/85 leading-relaxed pt-2 border-t border-white/10">
                  {t(article.content, lang)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const OffersPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;
  const common = uiStrings[lang].common;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.offers} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.offers}
        </h1>
      </div>

      <div className="space-y-8">
        {data.offers
          .filter((o) => o.active)
          .map((offer) => {
            const whatsappHref = buildWhatsAppLink(
              data.settings.whatsappNumber,
              lang === 'ar'
                ? `مرحباً دار ${data.settings.brandName}، أود الاستفادة من عرض: ${t(offer.title, 'ar')}`
                : `Hello ${data.settings.brandName}, I would like to inquire about the offer: ${t(offer.title, 'en')}`
            );

            return (
              <div
                key={offer.id}
                className="grid grid-cols-1 lg:grid-cols-12 bg-[#111111] border border-[#C9A24A]/40 overflow-hidden"
              >
                <div className="lg:col-span-5 min-h-[280px]">
                  <ResilientImage
                    src={offer.image}
                    alt={t(offer.title, lang)}
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:col-span-7 p-8 sm:p-10 space-y-5 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C9A24A]">
                    <Sparkles className="w-4 h-4" />
                    <span>{t(offer.badge, lang)}</span>
                  </div>
                  <h2 className="font-editorial text-3xl text-[#F7F7F5]">
                    {t(offer.title, lang)}
                  </h2>
                  <p className="text-sm text-[#E0C878]">{t(offer.subtitle, lang)}</p>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {t(offer.description, lang)}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                    <div>
                      <div className="text-lg font-semibold text-[#C9A24A]">
                        {t(offer.priceText, lang)}
                      </div>
                      <div className="text-xs text-[#A3A3A3]">
                        {t(offer.validUntil, lang)}
                      </div>
                    </div>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A24A] text-[#090909] font-semibold text-xs uppercase tracking-[0.16em]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{common.inquireWhatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'ar'
        ? `مرحباً دار ${data.settings.brandName}،\nالاسم: ${name}\nالمناسبة / الطلب: ${occasion}\nالتفاصيل: ${notes}`
        : `Hello ${data.settings.brandName},\nName: ${name}\nOccasion / Commission: ${occasion}\nNotes: ${notes}`;
    const url = buildWhatsAppLink(data.settings.whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.contact} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.contact}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6 bg-[#111111] border border-white/10 p-8">
          <h2 className="font-editorial text-2xl text-[#C9A24A]">
            {lang === 'ar' ? 'جناح الاستشارات الملكية' : 'Private Bespoke Concierge'}
          </h2>
          <div className="space-y-4 text-sm text-[#A3A3A3]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C9A24A] shrink-0 mt-1" />
              <span>{t(data.settings.address, lang)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C9A24A] shrink-0" />
              <span dir="ltr">{data.settings.phoneDisplay}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C9A24A] shrink-0" />
              <span>{data.settings.contactEmail}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C9A24A] shrink-0 mt-1" />
              <span>{t(data.settings.workingHours, lang)}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleWhatsAppSubmit}
          className="lg:col-span-7 bg-[#111111] border border-white/10 p-8 space-y-5"
        >
          <h2 className="font-editorial text-2xl text-[#F7F7F5]">
            {lang === 'ar'
              ? 'إرسال طلب موعد مباشر عبر واتساب'
              : 'Request Private Appointment via WhatsApp'}
          </h2>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-[#A3A3A3]">
              {lang === 'ar' ? 'الاسم الكريم' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#090909] border border-white/15 focus:border-[#C9A24A] px-4 py-3 text-sm text-[#F7F7F5] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-[#A3A3A3]">
              {lang === 'ar' ? 'نوع القطعة أو المناسبة' : 'Garment or Occasion'}
            </label>
            <input
              type="text"
              required
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'مثال: توكسيدو زفاف / بشت مراسم ملكي / بدلة سافيل رو'
                  : 'e.g., Sovereign Tuxedo / Royal Bisht / Bespoke Suit'
              }
              className="w-full bg-[#090909] border border-white/15 focus:border-[#C9A24A] px-4 py-3 text-sm text-[#F7F7F5] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-[#A3A3A3]">
              {lang === 'ar' ? 'ملاحظات إضافية أو الموعد المفضل' : 'Preferred Date & Notes'}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#090909] border border-white/15 focus:border-[#C9A24A] px-4 py-3 text-sm text-[#F7F7F5] outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs uppercase tracking-[0.16em] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp Concierge'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const StaticContentPage: React.FC<{
  lang: Language;
  pageKey: 'about' | 'privacy' | 'terms';
}> = ({ lang, pageKey }) => {
  const { data } = useCMS();
  const page = data.pages[pageKey];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <SEOHead lang={lang} title={t(page.title, lang)} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {t(page.title, lang)}
        </h1>
        <p className="text-sm text-[#A3A3A3]">{t(page.subtitle, lang)}</p>
      </div>

      <div className="space-y-8">
        {page.sections.map((sec, idx) => (
          <div key={idx} className="bg-[#111111] border border-white/10 p-8 space-y-3">
            <h2 className="font-editorial text-2xl text-[#C9A24A]">
              {t(sec.heading, lang)}
            </h2>
            <p className="text-sm text-[#F7F7F5]/90 leading-relaxed">
              {t(sec.body, lang)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
