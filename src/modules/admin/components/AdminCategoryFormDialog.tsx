'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminCategory, useUpdateAdminCategory } from '@/modules/admin/hooks/useAdminCategories';
import type { CategoryDto } from '@/types/contracts';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; category?: CategoryDto | null };

export function AdminCategoryFormDialog({ open, onOpenChange, category }: Props) {
  const createMutation = useCreateAdminCategory();
  const updateMutation = useUpdateAdminCategory();
  const form = useForm<Partial<CategoryDto>>({ defaultValues: { name: '', slug: '', description: '', displayOrder: 0, status: 'active' } });

  useEffect(() => {
    if (category) form.reset(category);
    else form.reset({ name: '', slug: '', description: '', displayOrder: 0, status: 'active' });
  }, [category, form]);

  function onSubmit(values: Partial<CategoryDto>) {
    if (category) {
      updateMutation.mutate({ id: category.id, data: values }, { onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    } else {
      createMutation.mutate(values as Omit<CategoryDto, 'id'>, { onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{category ? 'Sửa danh mục' : 'Thêm danh mục'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Tên</Label><Input {...form.register('name')} className="mt-1" /></label>
          <label className="block"><Label>Slug</Label><Input {...form.register('slug')} className="mt-1" /></label>
          <label className="block"><Label>Mô tả</Label><Input {...form.register('description')} className="mt-1" /></label>
          <label className="block"><Label>Thứ tự</Label><Input type="number" {...form.register('displayOrder', { valueAsNumber: true })} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
