'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminProductsService } from '@/modules/admin/services/admin-products.service';
import type { AdminProductListQuery } from '@/types/contracts';

export function useAdminProductsQuery(params: AdminProductListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.products(), queryFn: () => adminProductsService.list(params) });
}

export function useAdminProductDetailQuery(id: string) {
  return useQuery({ queryKey: adminQueryKeys.product(id), queryFn: () => adminProductsService.getById(id), enabled: Boolean(id) });
}

export function useCreateAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminProductsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.products() })
  });
}

export function useUpdateAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminProductsService.update>[1] }) => adminProductsService.update(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.products() });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.product(vars.id) });
    }
  });
}

export function useDisableAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminProductsService.disable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.products() })
  });
}
