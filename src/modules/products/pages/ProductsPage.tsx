'use client';

import { ProductList } from '@/modules/products/components/ProductList';
import { useI18n } from '@/i18n';

export function ProductsPage() {
  const { dictionary } = useI18n();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">{dictionary.products.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">{dictionary.products.title}</h1>
      </div>
      <ProductList />
    </main>
  );
}
