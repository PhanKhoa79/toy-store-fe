'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Badge, Skeleton } from '@/components/ui';
import { useI18n } from '@/i18n';
import { formatVnd } from '@/lib/utils';
import { AddToCartButton } from '@/modules/products/components/AddToCartButton';
import { useProductDetailQuery } from '@/modules/products/hooks/useProductDetailQuery';
import { useCreateReview, useProductReviewsQuery } from '@/modules/reviews/hooks/useReviewsQuery';
import { useAuthStore } from '@/stores/auth-store';

type ProductDetailPageProps = {
  slug: string;
};

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { dictionary } = useI18n();
  const { data: product, isLoading, error, refetch } = useProductDetailQuery(slug);

  if (isLoading) {
    return (
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-2">
        <Skeleton className="h-96 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </main>
    );
  }

  if (error) {
    return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  }

  if (!product) {
    return <EmptyState />;
  }

  const finalPrice = product.salePrice ?? product.price;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
        ← {dictionary.products.title}
      </Link>
      <section className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-brand-50 p-8 text-slate-500">
          {product.thumbnailUrl ? product.name : dictionary.products.imagePlaceholder}
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category?.name ?? 'Category'}</Badge>
            <Badge variant="outline">{product.brand?.name ?? 'Brand'}</Badge>
            <Badge variant="secondary">{product.gender}</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-black text-slate-950">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.shortDescription ?? dictionary.products.fallbackDescription}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-black text-brand-600">{formatVnd(finalPrice)}</p>
            {product.salePrice ? <p className="text-lg text-slate-400 line-through">{formatVnd(product.price)}</p> : null}
          </div>
          <p className="mt-3 text-sm text-slate-500">SKU: {product.sku} · Stock: {product.stock}</p>
          <div className="mt-8 flex gap-3">
            <AddToCartButton productId={product.id} />
            <Link href="/cart" className="inline-flex h-10 items-center rounded-md border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Mô tả sản phẩm</h2>
        <p className="mt-4 whitespace-pre-line text-slate-700">{product.description ?? product.shortDescription ?? dictionary.products.fallbackDescription}</p>
      </section>
      <ReviewsSection productId={product.id} />
    </main>
  );
}

function ReviewsSection({ productId }: { productId: string }) {
  const { data: reviewsData, isLoading } = useProductReviewsQuery(productId);
  const createReview = useCreateReview(productId);
  const reviews = reviewsData?.data ?? [];
  const { user } = useAuthStore();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  function submitReview() {
    if (!content.trim()) return;
    createReview.mutate({ rating, content }, {
      onSuccess: () => {
        setContent('');
        setRating(5);
      }
    });
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-black text-slate-950">Đánh giá</h2>

      {user && (
        <div className="mt-4 space-y-3 rounded-xl border border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className={`text-xl ${star <= rating ? 'text-brand-500' : 'text-slate-300'}`}>
                ⭐
              </button>
            ))}
          </div>
          <textarea
            className="w-full rounded-xl border border-slate-200 p-3 text-sm"
            rows={3}
            placeholder="Viết đánh giá của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="button"
            onClick={submitReview}
            disabled={createReview.isPending || !content.trim()}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {createReview.isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
          </button>
        </div>
      )}

      {isLoading && <Skeleton className="mt-4 h-32 rounded-3xl" />}
      {!isLoading && reviews.length === 0 && <p className="mt-4 text-slate-500">Chưa có đánh giá.</p>}
      {!isLoading && reviews.length > 0 && (
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{review.user?.fullName ?? 'Khách hàng'}</span>
                <span className="text-brand-600">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="mt-2 text-slate-700">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
