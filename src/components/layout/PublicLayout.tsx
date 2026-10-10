import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../../types/cms';
import { Header } from './Header';
import { Footer } from './Footer';

export const PublicLayout: React.FC<{
  lang: Language;
  children: React.ReactNode;
}> = ({ lang, children }) => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lang, location.pathname]);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#090909] text-[#F7F7F5]"
    >
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
};
