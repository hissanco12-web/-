import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ProductCard } from '../components/product/ProductCard';

export const CollectionDetailPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  const common = uiStrings[lang].common;

  const collection = data.collections.find((c) => c.slug === slug);
  if (!collection) {
    return <Navigate to={`/${lang}/collections`} replace />;
  }

  const collectionProducts = data.products.filter(
    (p) => p.collectionSlug === collection.slug
  );

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead
        lang={lang}
        title={t(collection.title, lang)}
        description={t(collection.description, lang)}
      />

      <Link
        to={`/${lang}/collections`}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C9A24A] hover:underline"
      >
        <BackIcon className="w-4 h-4" />
        <span>{common.backToCollections}</span>
      </Link>

      <div className="border-b border-white/10 pb-10 space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {t(collection.season, lang)}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {t(collection.title, lang)}
        </h1>
        <p className="text-sm text-[#A3A3A3] max-w-2xl leading-relaxed">
          {t(collection.description, lang)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(collectionProducts.length > 0 ? collectionProducts : data.products).map(
          (product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          )
        )}
      </div>
    </div>
  );
};
