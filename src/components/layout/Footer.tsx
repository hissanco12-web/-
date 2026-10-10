import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { Language } from '../../types/cms';
import { useCMS } from '../../context/CMSContext';
import { buildWhatsAppLink, t, uiStrings } from '../../lib/i18n';

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const nav = uiStrings[lang].nav;
  const common = uiStrings[lang].common;
  const socials = data.settings.socials;

  const whatsappHref = buildWhatsAppLink(
    data.settings.whatsappNumber,
    lang === 'ar'
      ? `مرحباً ${data.settings.brandName}، أود الاستفسار عن الأزياء الملكية والتفصيل الخاص.`
      : `Hello ${data.settings.brandName}, I would like to inquire about bespoke tailoring.`
  );

  const activeSocialLinks = [
    { label: 'Instagram', url: socials?.instagram || data.settings.instagramUrl },
    { label: 'Snapchat', url: socials?.snapchat },
    { label: 'TikTok', url: socials?.tiktok },
    { label: 'X (Twitter)', url: socials?.twitter },
    { label: 'Facebook', url: socials?.facebook },
    { label: 'YouTube', url: socials?.youtube },
    { label: lang === 'ar' ? 'الموقع على الخريطة' : 'Google Maps', url: socials?.googleMaps },
  ].filter((item) => Boolean(item.url && item.url.trim().length > 0));

  return (
    <footer className="bg-[#070707] border-t border-[#C9A24A]/20 text-[#F7F7F5] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-editorial text-2xl tracking-[0.2em] text-[#C9A24A]">
              {data.settings.brandName}
            </h3>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              {t(data.settings.tagline, lang)}
            </p>
            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#090909] text-xs uppercase tracking-[0.15em] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{nav.bookWhatsapp}</span>
              </a>
            </div>

            {activeSocialLinks.length > 0 && (
              <div className="pt-3 space-y-2">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[#C9A24A]">
                  {lang === 'ar' ? 'حسابات التواصل الرسمية' : 'Official Channels'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSocialLinks.map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111] border border-white/10 hover:border-[#C9A24A] text-xs text-[#F7F7F5] hover:text-[#C9A24A] transition-colors"
                    >
                      <span>{soc.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
              {lang === 'ar' ? 'روابط الدار' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              <li>
                <Link to={`/${lang}/collections`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.collections}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/products`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.products}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/services`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.services}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/gallery`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.gallery}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/offers`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.offers}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
              {lang === 'ar' ? 'عن كينغزمان لاين' : 'The House'}
            </h4>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              <li>
                <Link to={`/${lang}/about`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/articles`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.articles}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/contact`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.contact}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/privacy`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.privacy}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/terms`} className="hover:text-[#C9A24A] transition-colors">
                  {nav.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-[#A3A3A3]">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
              {lang === 'ar' ? 'الاستشارات الخاصة' : 'Private Concierge'}
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C9A24A] shrink-0 mt-1" />
              <span>{t(data.settings.address, lang)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C9A24A] shrink-0" />
              <span dir="ltr">{data.settings.phoneDisplay}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C9A24A] shrink-0" />
              <span>{data.settings.contactEmail}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#C9A24A] shrink-0 mt-1" />
              <span>{t(data.settings.workingHours, lang)}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
          <p>{common.rightsReserved}</p>
          <p className="tracking-[0.2em] uppercase text-[#C9A24A]/80">
            SAVILE ROW • RIYADH • ROYAL BESPOKE
          </p>
        </div>
      </div>
    </footer>
  );
};
