'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminProduct, useUpdateAdminProduct } from '@/modules/admin/hooks/useAdminProducts';
import type { ProductDto } from '@/types/contracts';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductDto | null;
};

export function AdminProductFormDialog({ open, onOpenChange, product }: Props) {
  const createMutation = useCreateAdminProduct();
  const updateMutation = useUpdateAdminProduct();
  const form = useForm<Partial<ProductDto>>({ defaultValues: { name: '', slug: '', sku: '', price: 0, stock: 0, status: 'active' } });

  useEffect(() => {
    if (product) {
      form.reset(product);
    } else {
      form.reset({ name: '', slug: '', sku: '', price: 0, stock: 0, status: 'active' });
    }
  }, [product, form]);

  function onSubmit(values: Partial<ProductDto>) {
    if (product) {
      updateMutation.mutate(
        { id: product.id, data: values },
        {
          onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); },
          onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
        }
      );
    } else {
      createMutation.mutate(
        values as Omit<ProductDto, 'id'>,
        {
          onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); },
          onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
        }
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Tên</Label><Input {...form.register('name')} className="mt-1" /></label>
          <label className="block"><Label>Slug</Label><Input {...form.register('slug')} className="mt-1" /></label>
          <label className="block"><Label>SKU</Label><Input {...form.register('sku')} className="mt-1" /></label>
          <label className="block"><Label>Giá</Label><Input type="number" {...form.register('price', { valueAsNumber: true })} className="mt-1" /></label>
          <label className="block"><Label>Sale Price</Label><Input type="number" {...form.register('salePrice', { valueAsNumber: true })} className="mt-1" /></label>
          <label className="block"><Label>Tồn kho</Label><Input type="number" {...form.register('stock', { valueAsNumber: true })} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
