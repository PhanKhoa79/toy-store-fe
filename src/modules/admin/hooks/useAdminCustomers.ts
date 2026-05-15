'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminCustomersService } from '@/modules/admin/services/admin-customers.service';
import type { AdminListQuery } from '@/types/contracts';

export function useAdminCustomersQuery(params: AdminListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.customers(), queryFn: () => adminCustomersService.list(params) });
}

export function useLockCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminCustomersService.lock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.customers() })
  });
}

export function useUnlockCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminCustomersService.unlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.customers() })
  });
}
