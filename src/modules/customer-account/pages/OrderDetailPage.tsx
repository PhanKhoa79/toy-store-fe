'use client';

import Link from 'next/link';
import { ApiErrorState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { useMyOrderDetailQuery } from '@/modules/orders/hooks/useOrderQueries';

const statusLabelMap: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy'
};

const paymentLabelMap: Record<string, string> = {
  pending: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  failed: 'Thất bại',
  refunded: 'Đã hoàn tiền'
};

type OrderDetailPageProps = {
  orderCode: string;
};

export function OrderDetailPage({ orderCode }: OrderDetailPageProps) {
  const { data: order, isLoading, error, refetch } = useMyOrderDetailQuery(orderCode);

  if (isLoading) {
    return <Skeleton className="h-80 rounded-3xl" />;
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  if (!order) return <p>Không tìm thấy đơn hàng.</p>;

  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="text-sm font-semibold text-brand-600 hover:underline">← Đơn hàng</Link>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{order.orderCode}</CardTitle>
            <Badge>{statusLabelMap[order.orderStatus] ?? order.orderStatus}</Badge>
          </div>
          <p className="text-sm text-slate-500">{paymentLabelMap[order.paymentStatus] ?? order.paymentStatus}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p><strong>Người nhận:</strong> {order.recipientName} · {order.recipientPhone}</p>
            <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 space-y-2">
            {(order.items ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.productName} x{item.quantity}</span>
                <span className="font-semibold">{formatVnd(item.lineTotal)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-lg font-black">
              <span>Tổng</span>
              <span className="text-brand-600">{formatVnd(order.totalAmount)}</span>
            </div>
          </div>
          {order.paymentStatus === 'pending' && order.orderStatus === 'pending' && (
            <Button asChild>
              <Link href="/checkout">Thanh toán lại</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
