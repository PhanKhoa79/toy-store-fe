'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { AdminBrandFormDialog } from '@/modules/admin/components/AdminBrandFormDialog';
import { useAdminBrandsQuery } from '@/modules/admin/hooks/useAdminBrands';
import type { BrandDto } from '@/types/contracts';

export function AdminBrandsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminBrandsQuery({ page, pageSize, search });
  const brands = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<BrandDto | null>(null);

  const columns: AppTableColumn<BrandDto>[] = [
    { key: 'name', header: 'Tên', cell: (row) => row.name },
    { key: 'slug', header: 'Slug', cell: (row) => row.slug },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>{row.status}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) => (
        <Button size="sm" variant="ghost" onClick={() => { setSelected(row); setDialogOpen(true); }}>Sửa</Button>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thương hiệu</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm thương hiệu</Button>
      </div>
      <Input placeholder="Tìm kiếm thương hiệu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={brands} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminBrandFormDialog open={dialogOpen} onOpenChange={setDialogOpen} brand={selected} />
    </div>
  );
}
