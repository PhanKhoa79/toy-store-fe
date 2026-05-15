'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { AdminCategoryFormDialog } from '@/modules/admin/components/AdminCategoryFormDialog';
import { useAdminCategoriesQuery } from '@/modules/admin/hooks/useAdminCategories';
import type { CategoryDto } from '@/types/contracts';

export function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminCategoriesQuery({ page, pageSize, search });
  const categories = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryDto | null>(null);

  const columns: AppTableColumn<CategoryDto>[] = [
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
        <h1 className="text-3xl font-bold">Danh mục</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm danh mục</Button>
      </div>
      <Input placeholder="Tìm kiếm danh mục..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={categories} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminCategoryFormDialog open={dialogOpen} onOpenChange={setDialogOpen} category={selected} />
    </div>
  );
}
