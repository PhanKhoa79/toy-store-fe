'use client';

import Link from 'next/link';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Badge, Card, Skeleton } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { useMyOrdersQuery } from '@/modules/orders/hooks/useOrderQueries';

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

export function OrdersPage() {
  const { data: orders, isLoading, error, refetch } = useMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  if (!orders || orders.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link key={order.id} href={`/account/orders/${order.orderCode}`}>
          <Card className="flex flex-col gap-3 p-5 hover:border-brand-500">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{order.orderCode}</span>
              <Badge>{statusLabelMap[order.orderStatus] ?? order.orderStatus}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{paymentLabelMap[order.paymentStatus] ?? order.paymentStatus}</span>
              <span className="text-lg font-black text-brand-600">{formatVnd(order.totalAmount)}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
