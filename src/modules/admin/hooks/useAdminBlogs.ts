'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminBlogsService } from '@/modules/admin/services/admin-blogs.service';
import type { AdminBlogListQuery } from '@/types/contracts';

export function useAdminBlogsQuery(params: AdminBlogListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.blogs(), queryFn: () => adminBlogsService.list(params) });
}

export function useCreateAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminBlogsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.blogs() })
  });
}

export function useUpdateAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminBlogsService.update>[1] }) => adminBlogsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.blogs() })
  });
}

export function usePublishAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminBlogsService.publish,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.blogs() })
  });
}

export function useArchiveAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminBlogsService.archive,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.blogs() })
  });
}
