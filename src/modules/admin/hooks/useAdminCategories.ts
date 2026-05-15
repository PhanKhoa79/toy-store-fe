'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminCategoriesService } from '@/modules/admin/services/admin-categories.service';
import type { AdminListQuery } from '@/types/contracts';

export function useAdminCategoriesQuery(params: AdminListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.categories(), queryFn: () => adminCategoriesService.list(params) });
}

export function useCreateAdminCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminCategoriesService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories() })
  });
}

export function useUpdateAdminCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminCategoriesService.update>[1] }) => adminCategoriesService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories() })
  });
}

export function useDisableAdminCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminCategoriesService.disable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.categories() })
  });
}
