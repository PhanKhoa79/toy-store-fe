'use client';

import Link from 'next/link';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Button, Card } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { useCartQuery } from '@/modules/cart/hooks/useCartQuery';
import { useAddCartItem } from '@/modules/cart/hooks/useAddCartItem';
import { useRemoveWishlistItem, useWishlistQuery } from '@/modules/customer-account/hooks/useCustomerAccountQueries';

export function WishlistPage() {
  const { data: wishlist, isLoading, error, refetch } = useWishlistQuery();
  const removeItem = useRemoveWishlistItem();
  const addCartItem = useAddCartItem();
  const { refetch: refetchCart } = useCartQuery();

  function moveToCart(productId: string) {
    addCartItem.mutate({ productId, quantity: 1 }, {
      onSuccess: () => {
        removeItem.mutate(productId);
        refetchCart();
      }
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  if (!wishlist || wishlist.length === 0) return <EmptyState />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yêu thích</h1>
      <div className="space-y-3">
        {wishlist.map((item) => (
          <Card key={item.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex aspect-square h-24 items-center justify-center rounded-2xl bg-brand-50 text-sm text-slate-500">
              {item.product.thumbnailUrl ? item.product.name : 'No image'}
            </div>
            <div className="flex-1">
              <Link href={`/products/${item.product.slug}`} className="font-semibold text-slate-900 hover:text-brand-600">
                {item.product.name}
              </Link>
              <p className="mt-1 text-lg font-black text-brand-600">{formatVnd(item.product.salePrice ?? item.product.price)}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => moveToCart(item.productId)} disabled={addCartItem.isPending}>Thêm giỏ</Button>
              <Button size="sm" variant="outline" onClick={() => removeItem.mutate(item.productId)} disabled={removeItem.isPending}>Xóa</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
