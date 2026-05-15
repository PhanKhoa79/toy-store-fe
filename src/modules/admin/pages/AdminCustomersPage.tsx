'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { useAdminCustomersQuery, useLockCustomer, useUnlockCustomer } from '@/modules/admin/hooks/useAdminCustomers';
import type { AdminCustomerDto } from '@/types/contracts';

export function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminCustomersQuery({ page, pageSize, search });
  const lockMutation = useLockCustomer();
  const unlockMutation = useUnlockCustomer();
  const customers = data?.data ?? [];
  const meta = data?.meta;

  const columns: AppTableColumn<AdminCustomerDto>[] = [
    { key: 'fullName', header: 'Họ tên', cell: (row) => row.fullName },
    { key: 'email', header: 'Email', cell: (row) => row.email },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (row) => <Badge variant={row.isActive ? 'default' : 'destructive'}>{row.isActive ? 'Hoạt động' : 'Khóa'}</Badge>
    },
    {
      key: 'actions',
      header: '',
      cell: (row) =>
        row.isActive ? (
          <Button size="sm" variant="outline" onClick={() => lockMutation.mutate(row.id)} disabled={lockMutation.isPending}>
            Khóa
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={() => unlockMutation.mutate(row.id)} disabled={unlockMutation.isPending}>
            Mở khóa
          </Button>
        )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Khách hàng</h1>
      <Input placeholder="Tìm kiếm khách hàng..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={customers} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
