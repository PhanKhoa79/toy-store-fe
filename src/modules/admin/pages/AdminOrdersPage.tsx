'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { AdminOrderDetailDrawer } from '@/modules/admin/components/AdminOrderDetailDrawer';
import { useAdminOrdersQuery } from '@/modules/admin/hooks/useAdminOrders';
import type { OrderDto } from '@/types/contracts';

const statusLabelMap: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy'
};

export function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminOrdersQuery({ page, pageSize, search });
  const orders = data?.data ?? [];
  const meta = data?.meta;
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const columns: AppTableColumn<OrderDto>[] = [
    { key: 'orderCode', header: 'Mã đơn', cell: (row) => row.orderCode },
    { key: 'recipient', header: 'Người nhận', cell: (row) => row.recipientName },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge>{statusLabelMap[row.orderStatus] ?? row.orderStatus}</Badge>
    },
    { key: 'total', header: 'Tổng', cell: (row) => formatVnd(row.totalAmount) },
    {
      key: 'actions',
      header: '',
      cell: (row) => (
        <Button size="sm" variant="ghost" onClick={() => { setSelectedOrderId(row.id); setDetailOpen(true); }}>
          Chi tiết
        </Button>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Đơn hàng</h1>
      </div>
      <Input placeholder="Tìm kiếm đơn hàng..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={orders} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      {selectedOrderId && (
        <AdminOrderDetailDrawer orderId={selectedOrderId} open={detailOpen} onOpenChange={setDetailOpen} />
      )}
    </div>
  );
}
