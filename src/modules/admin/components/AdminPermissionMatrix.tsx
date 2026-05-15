'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button, Card } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useAdminPermissionsQuery, useUpdateUserPermissions } from '@/modules/admin/hooks/useAdminUsers';

type Props = {
  userId: string;
  currentPermissionIds: string[];
  onClose: () => void;
};

export function AdminPermissionMatrix({ userId, currentPermissionIds, onClose }: Props) {
  const { data: allPermissions, isLoading } = useAdminPermissionsQuery();
  const updatePermissions = useUpdateUserPermissions();
  const [selected, setSelected] = useState<Set<string>>(new Set(currentPermissionIds));

  useEffect(() => {
    setSelected(new Set(currentPermissionIds));
  }, [currentPermissionIds]);

  const grouped = (allPermissions ?? []).reduce<Record<string, typeof allPermissions>>((acc, p) => {
    if (!acc[p.module]) acc[p.module] = [];
    acc[p.module]!.push(p);
    return acc;
  }, {});

  function toggle(permissionId: string) {
    const next = new Set(selected);
    if (next.has(permissionId)) next.delete(permissionId);
    else next.add(permissionId);
    setSelected(next);
  }

  function save() {
    updatePermissions.mutate(
      { id: userId, permissionIds: Array.from(selected) },
      {
        onSuccess: () => { toast.success('Đã cập nhật quyền'); onClose(); },
        onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
      }
    );
  }

  if (isLoading) return <p className="text-sm text-slate-500">Đang tải...</p>;

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([module, permissions]) => (
        <Card key={module} className="p-4">
          <h3 className="text-sm font-bold uppercase text-slate-500">{module}</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {permissions?.map((p) => (
              <label key={p.id} className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggle(p.id)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm">{p.action}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}
      <div className="flex gap-2">
        <Button onClick={save} disabled={updatePermissions.isPending}>Lưu</Button>
        <Button variant="outline" onClick={onClose}>Hủy</Button>
      </div>
    </div>
  );
}
