import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { Language } from '../../types/cms';
import { buildWhatsAppLink, t, uiStrings } from '../../lib/i18n';
import { useCMS } from '../../context/CMSContext';

export const Header: React.FC<{ lang: Language }> = ({ lang }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data } = useCMS();
  const location = useLocation();
  const strings = uiStrings[lang].nav;

  const targetLang: Language = lang === 'ar' ? 'en' : 'ar';
  const currentSubPath = location.pathname.replace(/^\/(ar|en)/, '');
  const switchedPath = `/${targetLang}${currentSubPath || ''}`;

  const navItems = [
    { label: strings.home, to: `/${lang}` },
    { label: strings.collections, to: `/${lang}/collections` },
    { label: strings.products, to: `/${lang}/products` },
    { label: strings.services, to: `/${lang}/services` },
    { label: strings.gallery, to: `/${lang}/gallery` },
    { label: strings.articles, to: `/${lang}/articles` },
    { label: strings.offers, to: `/${lang}/offers` },
    { label: strings.about, to: `/${lang}/about` },
    { label: strings.contact, to: `/${lang}/contact` },
  ];

  const whatsappHref = buildWhatsAppLink(
    data.settings.whatsappNumber,
    lang === 'ar'
      ? `مرحباً دار ${data.settings.brandName}، أود حجز استشارة تفصيل خاصة.`
      : `Hello ${data.settings.brandName}, I would like to request a private bespoke consultation.`
  );

  return (
    <header className="sticky top-0 z-50 bg-[#090909]/95 backdrop-blur-md border-b border-[#C9A24A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to={`/${lang}`} className="flex flex-col group">
          <span className="font-editorial text-xl sm:text-2xl tracking-[0.22em] text-[#F7F7F5] font-semibold group-hover:text-[#C9A24A] transition-colors">
            {data.settings.brandName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A24A]">
            {lang === 'ar' ? 'الأتيليه الملكي الخاص' : 'SAVILE ROW & ROYAL HERITAGE'}
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to === `/${lang}` && location.pathname === '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-xs uppercase tracking-[0.14em] transition-colors py-1 border-b ${
                  isActive
                    ? 'text-[#C9A24A] border-[#C9A24A]'
                    : 'text-[#F7F7F5]/80 border-transparent hover:text-[#C9A24A]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={switchedPath}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 hover:border-[#C9A24A] text-xs tracking-wider text-[#F7F7F5] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#C9A24A]" />
            <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-medium text-xs uppercase tracking-[0.12em] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{strings.bookWhatsapp}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-[#F7F7F5] hover:text-[#C9A24A]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-[#0e0e0e] border-b border-[#C9A24A]/20 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#F7F7F5]/90 hover:text-[#C9A24A] py-1.5 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A24A] text-[#090909] font-medium text-xs uppercase tracking-[0.14em]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{strings.bookWhatsapp}</span>
            </a>
            <p className="text-[11px] text-[#A3A3A3] text-center">
              {t(data.settings.address, lang)}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
