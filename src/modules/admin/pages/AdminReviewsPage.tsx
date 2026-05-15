'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { useAdminReviewsQuery, useUpdateReviewStatus } from '@/modules/admin/hooks/useAdminReviews';
import type { ReviewDto } from '@/types/contracts';

export function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminReviewsQuery({ page, pageSize, search });
  const updateStatus = useUpdateReviewStatus();
  const reviews = data?.data ?? [];
  const meta = data?.meta;

  const columns: AppTableColumn<ReviewDto>[] = [
    { key: 'rating', header: 'Rating', cell: (row) => `${row.rating}⭐` },
    { key: 'content', header: 'Nội dung', cell: (row) => row.content },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge>{row.status}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) =>
        row.status === 'pending' ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => updateStatus.mutate({ id: row.id, status: 'approved' })} disabled={updateStatus.isPending}>
              Duyệt
            </Button>
            <Button size="sm" variant="destructive" onClick={() => updateStatus.mutate({ id: row.id, status: 'rejected' })} disabled={updateStatus.isPending}>
              Từ chối
            </Button>
          </div>
        ) : null
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Đánh giá</h1>
      <Input placeholder="Tìm kiếm đánh giá..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={reviews} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
