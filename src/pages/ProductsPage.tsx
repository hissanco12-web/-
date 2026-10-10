import React, { useState } from 'react';
import { Language } from '../types/cms';
import { useCMS } from '../context/CMSContext';
import { uiStrings } from '../lib/i18n';
import { SEOHead } from '../components/common/SEOHead';
import { ProductCard } from '../components/product/ProductCard';

export const ProductsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { data } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const common = uiStrings[lang].common;
  const nav = uiStrings[lang].nav;

  const categories = Array.from(
    new Set(data.products.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts =
    selectedCategory === 'ALL'
      ? data.products
      : data.products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SEOHead
        lang={lang}
        title={nav.products}
        description={
          lang === 'ar'
            ? 'تشكيلة الأزياء الملكية، بدلات التوكسيدو، والبشوت الحساوية الفاخرة من دار KINGSMEN LINE.'
            : 'Explore bespoke tuxedos, ceremonial royal bishts, and hand-tailored suits by KINGSMEN LINE.'
        }
      />

      <div className="space-y-4 border-b border-white/10 pb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24A]">
          {data.settings.brandName}
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F7F5]">
          {nav.products}
        </h1>
        <p className="text-sm text-[#A3A3A3] max-w-2xl">
          {common.conciergeNote}
        </p>

        <div className="pt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-[#C9A24A] text-[#090909] border-[#C9A24A] font-medium'
                : 'border-white/15 text-[#A3A3A3] hover:border-[#C9A24A]'
            }`}
          >
            {common.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C9A24A] text-[#090909] border-[#C9A24A] font-medium'
                  : 'border-white/15 text-[#A3A3A3] hover:border-[#C9A24A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  );
};
