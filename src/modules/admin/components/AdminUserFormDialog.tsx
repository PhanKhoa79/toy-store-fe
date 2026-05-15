'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminUser, useUpdateAdminUser } from '@/modules/admin/hooks/useAdminUsers';
import type { AdminUserDto } from '@/types/contracts';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; user?: AdminUserDto | null };

export function AdminUserFormDialog({ open, onOpenChange, user }: Props) {
  const createMutation = useCreateAdminUser();
  const updateMutation = useUpdateAdminUser();
  const form = useForm<Partial<AdminUserDto> & { password?: string }>({ defaultValues: { fullName: '', email: '', phone: '', role: 'staff', isActive: true, password: '' } });

  useEffect(() => {
    if (user) form.reset({ ...user, password: '' });
    else form.reset({ fullName: '', email: '', phone: '', role: 'staff', isActive: true, password: '' });
  }, [user, form]);

  function onSubmit(values: Partial<AdminUserDto> & { password?: string }) {
    if (user) {
      const { password, ...rest } = values;
      updateMutation.mutate({ id: user.id, data: password ? values : rest }, { onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    } else {
      createMutation.mutate(values as Parameters<typeof createMutation.mutate>[0], { onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{user ? 'Sửa nhân viên' : 'Thêm nhân viên'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Họ tên</Label><Input {...form.register('fullName')} className="mt-1" /></label>
          <label className="block"><Label>Email</Label><Input {...form.register('email')} className="mt-1" /></label>
          <label className="block"><Label>Số điện thoại</Label><Input {...form.register('phone')} className="mt-1" /></label>
          <label className="block"><Label>Vai trò</Label>
            <select {...form.register('role')} className="mt-1 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label className="block"><Label>Mật khẩu {user ? '(để trống nếu không đổi)' : ''}</Label><Input type="password" {...form.register('password')} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
