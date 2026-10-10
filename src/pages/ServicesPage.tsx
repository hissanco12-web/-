import React from 'react';
import { MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { buildWhatsAppLink, t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ResilientImage } from '../components/common/ResilientImage';

export const ServicesPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;
  const common = uiStrings[lang].common;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead lang={lang} title={nav.services} />

      <div className="space-y-3 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {common.bespokeServices}
        </h1>
      </div>

      <div className="space-y-12">
        {data.services.map((srv) => {
          const whatsappHref = buildWhatsAppLink(
            data.settings.whatsappNumber,
            lang === 'ar'
              ? `مرحباً دار ${data.settings.brandName}، أود حجز خدمة: ${t(srv.title, 'ar')}`
              : `Hello ${data.settings.brandName}, I would like to book: ${t(srv.title, 'en')}`
          );

          return (
            <div
              key={srv.id}
              className="grid grid-cols-1 lg:grid-cols-12 bg-[#111111] border border-white/10 overflow-hidden"
            >
              <div className="lg:col-span-5 min-h-[300px]">
                <ResilientImage
                  src={srv.image}
                  alt={t(srv.title, lang)}
                  className="w-full h-full"
                />
              </div>
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#C9A24A]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {t(srv.duration, lang)}
                    </span>
                    <span className="text-[#E0C878]">{t(srv.priceNote, lang)}</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#F7F7F5]">
                    {t(srv.title, lang)}
                  </h2>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {t(srv.description, lang)}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#F7F7F5]/90">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                        <span>{t(h, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs uppercase tracking-[0.16em] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{common.bookAppointment}</span>
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
