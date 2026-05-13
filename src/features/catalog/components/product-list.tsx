'use client';

import { useProducts } from '@/features/catalog/hooks/use-products';
import { formatVnd } from '@/lib/utils';

export function ProductList() {
  const { data, isLoading, error } = useProducts({ page: 1, pageSize: 12 });

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Catalog</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">San pham</h1>
      </div>

      {isLoading ? <p>Dang tai san pham...</p> : null}
      {error ? <p className="text-red-600">Khong tai duoc danh sach san pham.</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((product) => (
          <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-brand-50 text-sm text-slate-500">
              {product.thumbnailUrl ? product.name : 'Product image'}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.sku}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">{product.name}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.shortDescription ?? 'Do choi an toan cho be.'}</p>
            <p className="mt-4 text-lg font-black text-brand-600">{formatVnd(product.salePrice ?? product.price)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
