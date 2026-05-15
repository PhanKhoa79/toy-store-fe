'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApiErrorState, EmptyState, RetryButton } from '@/components/common';
import { Button, Card, Skeleton } from '@/components/ui';
import { useI18n } from '@/i18n';
import { formatVnd } from '@/lib/utils';
import { CustomerGuard } from '@/modules/auth';
import { useCartQuery } from '@/modules/cart/hooks/useCartQuery';
import { useRemoveCartItem } from '@/modules/cart/hooks/useRemoveCartItem';
import { useUpdateCartItem } from '@/modules/cart/hooks/useUpdateCartItem';

export function CartPage() {
  const router = useRouter();
  const { dictionary } = useI18n();
  const { data: cart, isLoading, error, refetch } = useCartQuery();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  return (
    <CustomerGuard>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold">{dictionary.cart.title}</h1>

        {isLoading && (
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-3xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-6">
            <ApiErrorState error={error} onRetry={() => void refetch()} />
          </div>
        )}

        {!isLoading && !error && (!cart || cart.items.length === 0) && (
          <div className="mt-6">
            <EmptyState />
            <div className="mt-4 text-center">
              <Link href="/products" className="text-brand-600 hover:underline">{dictionary.home.products}</Link>
            </div>
          </div>
        )}

        {!isLoading && !error && cart && cart.items.length > 0 && (
          <>
            <div className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <Card key={item.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="flex aspect-square h-24 items-center justify-center rounded-2xl bg-brand-50 text-sm text-slate-500">
                    {item.product.thumbnailUrl ? item.product.name : dictionary.products.imagePlaceholder}
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`} className="font-semibold text-slate-900 hover:text-brand-600">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-slate-500">SKU: {item.product.sku}</p>
                    <p className="mt-1 text-lg font-black text-brand-600">{formatVnd(item.unitPrice)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200">
                      <Button type="button" variant="ghost" size="sm" onClick={() => updateItem.mutate({ cartItemId: item.id, quantity: Math.max(1, item.quantity - 1) })} disabled={updateItem.isPending}>-</Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => updateItem.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })} disabled={updateItem.isPending}>+</Button>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeItem.mutate(item.id)} disabled={removeItem.isPending}>Xóa</Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-700">Tạm tính</span>
                <span className="text-2xl font-black text-brand-600">{formatVnd(cart.subtotalAmount)}</span>
              </div>
              <Button type="button" className="mt-6 w-full" size="lg" onClick={() => router.push('/checkout')}>
                Thanh toán
              </Button>
            </div>
          </>
        )}
      </main>
    </CustomerGuard>
  );
}
