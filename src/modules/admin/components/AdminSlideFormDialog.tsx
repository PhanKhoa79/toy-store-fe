'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminSlide, useUpdateAdminSlide } from '@/modules/admin/hooks/useAdminSlides';
import type { HomepageSlideDto } from '@/types/contracts';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; slide?: HomepageSlideDto | null };

export function AdminSlideFormDialog({ open, onOpenChange, slide }: Props) {
  const createMutation = useCreateAdminSlide();
  const updateMutation = useUpdateAdminSlide();
  const form = useForm<Partial<HomepageSlideDto>>({ defaultValues: { title: '', subtitle: '', imageUrl: '', linkUrl: '', displayOrder: 0, isActive: true } });

  useEffect(() => {
    if (slide) form.reset(slide);
    else form.reset({ title: '', subtitle: '', imageUrl: '', linkUrl: '', displayOrder: 0, isActive: true });
  }, [slide, form]);

  function onSubmit(values: Partial<HomepageSlideDto>) {
    if (slide) {
      updateMutation.mutate({ id: slide.id, data: values }, { onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    } else {
      createMutation.mutate(values as Omit<HomepageSlideDto, 'id'>, { onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{slide ? 'Sửa slide' : 'Thêm slide'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Tiêu đề</Label><Input {...form.register('title')} className="mt-1" /></label>
          <label className="block"><Label>Subtitle</Label><Input {...form.register('subtitle')} className="mt-1" /></label>
          <label className="block"><Label>Image URL</Label><Input {...form.register('imageUrl')} className="mt-1" /></label>
          <label className="block"><Label>Link URL</Label><Input {...form.register('linkUrl')} className="mt-1" /></label>
          <label className="block"><Label>Thứ tự</Label><Input type="number" {...form.register('displayOrder', { valueAsNumber: true })} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
