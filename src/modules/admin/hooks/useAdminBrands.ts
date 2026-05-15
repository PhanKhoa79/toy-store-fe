'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminBrandsService } from '@/modules/admin/services/admin-brands.service';
import type { AdminListQuery } from '@/types/contracts';

export function useAdminBrandsQuery(params: AdminListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.brands(), queryFn: () => adminBrandsService.list(params) });
}

export function useCreateAdminBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminBrandsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.brands() })
  });
}

export function useUpdateAdminBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminBrandsService.update>[1] }) => adminBrandsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.brands() })
  });
}

export function useDisableAdminBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminBrandsService.disable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.brands() })
  });
}
