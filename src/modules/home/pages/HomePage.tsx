'use client';

import Link from 'next/link';
import { ApiErrorState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { useI18n } from '@/i18n';
import { formatVnd } from '@/lib/utils';
import { useFeaturedProductsQuery, useHomeBrandsQuery, useHomeCategoriesQuery, useHomeSlidesQuery } from '@/modules/home/hooks/useHomeDataQuery';

export function HomePage() {
  const { dictionary } = useI18n();
  const slidesQuery = useHomeSlidesQuery();
  const categoriesQuery = useHomeCategoriesQuery();
  const brandsQuery = useHomeBrandsQuery();
  const productsQuery = useFeaturedProductsQuery();

  if (slidesQuery.isLoading || categoriesQuery.isLoading || brandsQuery.isLoading || productsQuery.isLoading) {
    return (
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <Skeleton className="h-80 rounded-[2rem]" />
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </main>
    );
  }

  if (slidesQuery.error || categoriesQuery.error || brandsQuery.error || productsQuery.error) {
    return <ApiErrorState error={slidesQuery.error ?? categoriesQuery.error ?? brandsQuery.error ?? productsQuery.error} />;
  }

  const primarySlide = slidesQuery.data?.[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffe2a8,transparent_36%),linear-gradient(135deg,#fffaf0,#eef7ff)] px-6 py-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur md:p-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">{dictionary.home.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{primarySlide?.title ?? dictionary.home.title}</h1>
          <p className="text-lg leading-8 text-slate-700">{primarySlide?.subtitle ?? dictionary.home.description}</p>
        </div>
        <Link href={primarySlide?.linkUrl ?? '/products'} className="w-fit rounded-full bg-slate-950 px-6 py-3 font-bold text-white hover:bg-brand-600">
          {dictionary.home.products}
        </Link>
      </section>

      <section className="mx-auto mt-8 max-w-6xl">
        <h2 className="text-2xl font-black text-slate-950">Danh mục</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(categoriesQuery.data ?? []).map((category) => (
            <Link key={category.id} href={`/products?categoryId=${category.id}`} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-900 shadow-sm hover:border-brand-500 hover:text-brand-600">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl">
        <h2 className="text-2xl font-black text-slate-950">Sản phẩm nổi bật</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(productsQuery.data ?? []).map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-500">
              <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-brand-50 text-sm text-slate-500">{product.thumbnailUrl ? product.name : dictionary.products.imagePlaceholder}</div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.sku}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">{product.name}</h3>
              <p className="mt-4 text-lg font-black text-brand-600">{formatVnd(product.salePrice ?? product.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl">
        <h2 className="text-2xl font-black text-slate-950">Thương hiệu</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {(brandsQuery.data ?? []).map((brand) => (
            <Link key={brand.id} href={`/products?brandId=${brand.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600">
              {brand.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
