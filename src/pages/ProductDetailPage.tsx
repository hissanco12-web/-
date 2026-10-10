import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { t, uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ProductDetails } from '../components/product/ProductDetails';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useCMS();
  const common = uiStrings[lang].common;

  const product = data.products.find((p) => p.slug === slug);
  if (!product) {
    return <Navigate to={`/${lang}/products`} replace />;
  }

  const related = data.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SEOHead
        lang={lang}
        title={t(product.name, lang)}
        description={t(product.description, lang)}
      />

      <div>
        <Link
          to={`/${lang}/products`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C9A24A] hover:underline"
        >
          <BackIcon className="w-4 h-4" />
          <span>{common.backToProducts}</span>
        </Link>
      </div>

      <ProductDetails product={product} lang={lang} />

      {related.length > 0 && (
        <section className="pt-12 border-t border-white/10 space-y-8">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#F7F7F5]">
            {common.relatedPieces}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
