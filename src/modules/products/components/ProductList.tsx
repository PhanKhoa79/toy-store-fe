'use client';

import { ApiErrorState } from '@/components/common/ApiErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useI18n } from '@/i18n';
import { formatVnd } from '@/lib/utils';
import { useProductsQuery } from '@/modules/products/hooks/useProductsQuery';

export function ProductList() {
  const { dictionary } = useI18n();
  const { data, isLoading, error, refetch } = useProductsQuery({ page: 1, pageSize: 12 });

  if (isLoading) {
    return <Skeleton className="h-72 w-full" />;
  }

  if (error) {
    return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  }

  if (!data?.data.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((product) => (
        <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-brand-50 text-sm text-slate-500">
            {product.thumbnailUrl ? product.name : dictionary.products.imagePlaceholder}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.sku}</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">{product.name}</h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.shortDescription ?? dictionary.products.fallbackDescription}</p>
          <p className="mt-4 text-lg font-black text-brand-600">{formatVnd(product.salePrice ?? product.price)}</p>
        </article>
      ))}
    </div>
  );
}
