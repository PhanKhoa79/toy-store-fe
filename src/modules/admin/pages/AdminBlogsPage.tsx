'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { AdminBlogFormDialog } from '@/modules/admin/components/AdminBlogFormDialog';
import { useAdminBlogsQuery, useArchiveAdminBlog, usePublishAdminBlog } from '@/modules/admin/hooks/useAdminBlogs';
import type { BlogDto } from '@/types/contracts';

export function AdminBlogsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminBlogsQuery({ page, pageSize, search });
  const publishMutation = usePublishAdminBlog();
  const archiveMutation = useArchiveAdminBlog();
  const blogs = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<BlogDto | null>(null);

  const columns: AppTableColumn<BlogDto>[] = [
    { key: 'title', header: 'Tiêu đề', cell: (row) => row.title },
    { key: 'slug', header: 'Slug', cell: (row) => row.slug },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge>{row.status}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => { setSelected(row); setDialogOpen(true); }}>Sửa</Button>
          {row.status !== 'published' && (
            <Button size="sm" variant="outline" onClick={() => publishMutation.mutate(row.id)} disabled={publishMutation.isPending}>Publish</Button>
          )}
          {row.status !== 'archived' && (
            <Button size="sm" variant="secondary" onClick={() => archiveMutation.mutate(row.id)} disabled={archiveMutation.isPending}>Archive</Button>
          )}
        </div>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bài viết</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm bài viết</Button>
      </div>
      <Input placeholder="Tìm kiếm bài viết..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={blogs} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminBlogFormDialog open={dialogOpen} onOpenChange={setDialogOpen} blog={selected} />
    </div>
  );
}
