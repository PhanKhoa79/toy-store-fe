'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Button, Card, Skeleton } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { formatVnd } from '@/lib/utils';
import { CustomerGuard } from '@/modules/auth';
import { useCartQuery } from '@/modules/cart/hooks/useCartQuery';
import { useCheckoutMutation } from '@/modules/checkout/hooks/useCheckoutMutation';
import { useCustomerAddressesQuery } from '@/modules/customer-account/hooks/useCustomerAccountQueries';

export function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading: cartLoading, error: cartError } = useCartQuery();
  const { data: addresses, isLoading: addrLoading } = useCustomerAddressesQuery();
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const checkoutMutation = useCheckoutMutation();

  function handleCheckout() {
    const address = addresses?.find((a) => a.id === selectedAddressId);
    checkoutMutation.mutate(
      {
        addressId: address?.id,
        recipientName: address?.recipientName,
        recipientPhone: address?.recipientPhone,
        shippingAddress: address?.addressLine,
        paymentMethod: 'vnpay'
      },
      {
        onSuccess: (result) => {
          if (result.paymentUrl) {
            window.location.href = result.paymentUrl;
          } else {
            router.push(`/account/orders/${result.order.orderCode}`);
          }
        },
        onError: (error) => toast.error('Thanh toán thất bại', { description: getApiErrorMessage(error) })
      }
    );
  }

  const isLoading = cartLoading || addrLoading;

  return (
    <CustomerGuard>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold">Thanh toán</h1>

        {isLoading && (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-40 rounded-3xl" />
            <Skeleton className="h-40 rounded-3xl" />
          </div>
        )}

        {cartError && <ApiErrorState error={cartError} />}

        {!isLoading && (!cart || cart.items.length === 0) && <EmptyState />}

        {!isLoading && cart && cart.items.length > 0 && (
          <div className="mt-6 space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Đơn hàng</h2>
              <div className="mt-4 space-y-3">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-slate-700">{item.product.name} x{item.quantity}</span>
                    <span className="font-semibold text-slate-900">{formatVnd(item.lineTotal)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-black">
                  <span>Tổng</span>
                  <span className="text-brand-600">{formatVnd(cart.subtotalAmount)}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Địa chỉ giao hàng</h2>
              <div className="mt-4 space-y-3">
                {(addresses ?? []).map((addr) => (
                  <label key={addr.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{addr.recipientName} · {addr.recipientPhone}</p>
                      <p className="text-sm text-slate-600">{addr.addressLine}</p>
                      {addr.isDefault && <span className="text-xs text-brand-600 font-semibold">Mặc định</span>}
                    </div>
                  </label>
                ))}
                {(addresses ?? []).length === 0 && (
                  <p className="text-sm text-slate-500">Chưa có địa chỉ. <Button asChild variant="link" size="sm"><a href="/account/addresses">Thêm địa chỉ</a></Button></p>
                )}
              </div>
            </section>

            <Button
              type="button"
              className="w-full"
              size="lg"
              disabled={checkoutMutation.isPending || !selectedAddressId}
              onClick={handleCheckout}
            >
              {checkoutMutation.isPending ? 'Đang xử lý...' : 'Thanh toán qua VNPAY'}
            </Button>
          </div>
        )}
      </main>
    </CustomerGuard>
  );
}
