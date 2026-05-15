'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { AdminSlideFormDialog } from '@/modules/admin/components/AdminSlideFormDialog';
import { useAdminSlidesQuery, useDisableAdminSlide } from '@/modules/admin/hooks/useAdminSlides';
import type { HomepageSlideDto } from '@/types/contracts';

export function AdminSlidesPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminSlidesQuery({ page, pageSize, search });
  const disableMutation = useDisableAdminSlide();
  const slides = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<HomepageSlideDto | null>(null);

  const columns: AppTableColumn<HomepageSlideDto>[] = [
    { key: 'title', header: 'Tiêu đề', cell: (row) => row.title },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge variant={row.isActive ? 'default' : 'secondary'}>{row.isActive ? 'Active' : 'Inactive'}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => { setSelected(row); setDialogOpen(true); }}>Sửa</Button>
          <Button size="sm" variant="destructive" onClick={() => disableMutation.mutate(row.id)} disabled={disableMutation.isPending}>Xóa</Button>
        </div>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Homepage Slides</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm slide</Button>
      </div>
      <Input placeholder="Tìm kiếm slide..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={slides} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminSlideFormDialog open={dialogOpen} onOpenChange={setDialogOpen} slide={selected} />
    </div>
  );
}
