'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label, Textarea } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCreateAdminBlog, useUpdateAdminBlog } from '@/modules/admin/hooks/useAdminBlogs';
import type { BlogDto } from '@/types/contracts';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; blog?: BlogDto | null };

export function AdminBlogFormDialog({ open, onOpenChange, blog }: Props) {
  const createMutation = useCreateAdminBlog();
  const updateMutation = useUpdateAdminBlog();
  const form = useForm<Partial<BlogDto>>({ defaultValues: { title: '', slug: '', excerpt: '', content: '', thumbnailUrl: '' } });

  useEffect(() => {
    if (blog) form.reset(blog);
    else form.reset({ title: '', slug: '', excerpt: '', content: '', thumbnailUrl: '' });
  }, [blog, form]);

  function onSubmit(values: Partial<BlogDto>) {
    if (blog) {
      updateMutation.mutate({ id: blog.id, data: values }, { onSuccess: () => { toast.success('Cập nhật thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    } else {
      createMutation.mutate(values, { onSuccess: () => { toast.success('Tạo thành công'); onOpenChange(false); }, onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) }) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{blog ? 'Sửa bài viết' : 'Thêm bài viết'}</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block"><Label>Tiêu đề</Label><Input {...form.register('title')} className="mt-1" /></label>
          <label className="block"><Label>Slug</Label><Input {...form.register('slug')} className="mt-1" /></label>
          <label className="block"><Label>Tóm tắt</Label><Input {...form.register('excerpt')} className="mt-1" /></label>
          <label className="block"><Label>Thumbnail URL</Label><Input {...form.register('thumbnailUrl')} className="mt-1" /></label>
          <label className="block"><Label>Nội dung</Label><Textarea {...form.register('content')} className="mt-1" /></label>
          <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>Lưu</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
