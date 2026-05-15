'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminBrand, useUpdateAdminBrand } from '@/modules/admin/hooks/useAdminBrands';
import type { BrandDto } from '@/types/contracts';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; brand?: BrandDto | null };

export function AdminBrandFormDialog({ open, onOpenChange, brand }: Props) {
  const createMutation = useCreateAdminBrand();
  const updateMutation = useUpdateAdminBrand();
  const form = useForm<Partial<BrandDto>>({ defaultValues: { name: '', slug: '', description: '', logoUrl: '', displayOrder: 0, status: 'active' } });

  useEffect(() => {
    if (brand) form.reset(brand);
    else form.reset({ name: '', slug: '', description: '', logoUrl: '', displayOrder: 0, status: 'active' });
  }, [brand, form]);

  function onSubmit(values: Partial<BrandDto>) {
    if (brand) {
      updateMutation.mutate({ id: brand.id, data: values }, { onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    } else {
      createMutation.mutate(values as Omit<BrandDto, 'id'>, { onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{brand ? 'Sửa thương hiệu' : 'Thêm thương hiệu'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Tên</Label><Input {...form.register('name')} className="mt-1" /></label>
          <label className="block"><Label>Slug</Label><Input {...form.register('slug')} className="mt-1" /></label>
          <label className="block"><Label>Mô tả</Label><Input {...form.register('description')} className="mt-1" /></label>
          <label className="block"><Label>Logo URL</Label><Input {...form.register('logoUrl')} className="mt-1" /></label>
          <label className="block"><Label>Thứ tự</Label><Input type="number" {...form.register('displayOrder', { valueAsNumber: true })} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
