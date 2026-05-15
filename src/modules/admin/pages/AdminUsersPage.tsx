'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { AppTable, type AppTableColumn, AppTablePagination } from '@/components/table';
import { Badge, Button, Input } from '@/components/ui';
import { AdminPermissionMatrix } from '@/modules/admin/components/AdminPermissionMatrix';
import { AdminUserFormDialog } from '@/modules/admin/components/AdminUserFormDialog';
import { useAdminUsersQuery } from '@/modules/admin/hooks/useAdminUsers';
import type { AdminUserDto } from '@/types/contracts';

export function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useAdminUsersQuery({ page, pageSize, search });
  const users = data?.data ?? [];
  const meta = data?.meta;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<AdminUserDto | null>(null);
  const [permUser, setPermUser] = useState<AdminUserDto | null>(null);

  const columns: AppTableColumn<AdminUserDto>[] = [
    { key: 'fullName', header: 'Họ tên', cell: (row) => row.fullName },
    { key: 'email', header: 'Email', cell: (row) => row.email },
    { key: 'role', header: 'Vai trò', cell: (row) => row.role },
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
          <Button size="sm" variant="outline" onClick={() => setPermUser(row)}>Quyền</Button>
        </div>
      )
    }
  ];

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nhân viên</h1>
        <Button size="sm" onClick={() => { setSelected(null); setDialogOpen(true); }}>Thêm nhân viên</Button>
      </div>
      <Input placeholder="Tìm kiếm nhân viên..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      <AppTable rows={users} columns={columns} isLoading={isLoading} getRowKey={(row) => row.id} />
      {meta && (
        <AppTablePagination
          pagination={{ page: meta.page, pageSize: meta.pageSize, total: meta.total, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
      <AdminUserFormDialog open={dialogOpen} onOpenChange={setDialogOpen} user={selected} />
      {permUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Phân quyền: {permUser.fullName}</h2>
              <Button size="sm" variant="ghost" onClick={() => setPermUser(null)}>✕</Button>
            </div>
            <div className="mt-4">
              <AdminPermissionMatrix
                userId={permUser.id}
                currentPermissionIds={(permUser.permissions ?? []).map((p) => p.id)}
                onClose={() => setPermUser(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
