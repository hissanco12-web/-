import React, { useEffect } from 'react';
import { Language } from '../../types/cms';
import { useCMS } from '../../context/CMSContext';
import { t } from '../../lib/i18n';

interface SEOHeadProps {
  title: string;
  description?: string;
  lang: Language;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, lang }) => {
  const { data } = useCMS();
  const seo = data.settings.seo;

  useEffect(() => {
    const defaultSeoTitle = seo ? t(seo.metaTitle, lang) : 'KINGSMEN LINE';
    const fullTitle = title.includes(data.settings.brandName)
      ? title
      : `${title} — ${defaultSeoTitle || data.settings.brandName}`;
    document.title = fullTitle;

    const htmlEl = document.documentElement;
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const effectiveDesc =
      description || (seo ? t(seo.metaDescription, lang) : '') || t(data.settings.tagline, lang);

    if (effectiveDesc) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', effectiveDesc);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', effectiveDesc);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', effectiveDesc);
    }

    const keywordsText = seo ? t(seo.keywords, lang) : '';
    if (keywordsText) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywordsText);
    }

    const ogImageUrl = seo?.ogImage || data.settings.hero.image;
    if (ogImageUrl) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', ogImageUrl);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
  }, [title, description, lang, data.settings, seo]);

  return null;
};
