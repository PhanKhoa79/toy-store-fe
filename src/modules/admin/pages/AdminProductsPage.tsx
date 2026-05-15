'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { formatVnd } from '@/lib/utils';
import { AdminProductFormDialog } from '@/modules/admin/components/AdminProductFormDialog';
import { useAdminProductsQuery } from '@/modules/admin/hooks/useAdminProducts';
import type { ProductDto } from '@/types/contracts';

export function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminProductsQuery({ page, pageSize, search });
  const products = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<ProductDto | null>(null);

  const columns: AppTableColumn<ProductDto>[] = [
    { key: 'name', header: 'Tên', cell: (row) => row.name },
    { key: 'sku', header: 'SKU', cell: (row) => row.sku },
    { key: 'price', header: 'Giá', cell: (row) => formatVnd(row.salePrice ?? row.price) },
    { key: 'stock', header: 'Tồn kho', cell: (row) => row.stock },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>{row.status}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) => (
        <Button size="sm" variant="ghost" onClick={() => { setSelected(row); setDialogOpen(true); }}>
          Sửa
        </Button>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sản phẩm</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm sản phẩm</Button>
      </div>
      <Input placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={products} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminProductFormDialog open={dialogOpen} onOpenChange={setDialogOpen} product={selected} />
    </div>
  );
}
