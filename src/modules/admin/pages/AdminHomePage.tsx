'use client';

import { ApiErrorState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { useOrderSummaryQuery, useRevenueSummaryQuery, useTopProductsQuery } from '@/modules/admin/hooks/useAdminDashboard';

export function AdminHomePage() {
  const revenueQuery = useRevenueSummaryQuery();
  const orderSummaryQuery = useOrderSummaryQuery();
  const topProductsQuery = useTopProductsQuery();

  const isLoading = revenueQuery.isLoading || orderSummaryQuery.isLoading || topProductsQuery.isLoading;
  const error = revenueQuery.error ?? orderSummaryQuery.error ?? topProductsQuery.error;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    );
  }

  if (error) return <ApiErrorState error={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-brand-600">{formatVnd(revenueQuery.data?.totalRevenue ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Tổng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-slate-900">{revenueQuery.data?.totalOrders ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Đơn đang xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-slate-900">
              {orderSummaryQuery.data?.find((o) => o.status === 'processing')?.count ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top sản phẩm bán chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(topProductsQuery.data ?? []).map((product) => (
              <div key={product.productId} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                <span className="font-semibold text-slate-900">{product.productName}</span>
                <span className="text-sm text-slate-500">{product.totalSold} đã bán · {formatVnd(product.totalRevenue)}</span>
              </div>
            ))}
            {(topProductsQuery.data ?? []).length === 0 && <p className="text-sm text-slate-500">Chưa có dữ liệu.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
