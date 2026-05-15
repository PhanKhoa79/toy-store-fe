'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminUsersService } from '@/modules/admin/services/admin-users.service';
import type { AdminUserListQuery } from '@/types/contracts';

export function useAdminUsersQuery(params: AdminUserListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.users(), queryFn: () => adminUsersService.list(params) });
}

export function useAdminUserDetailQuery(id: string) {
  return useQuery({ queryKey: adminQueryKeys.user(id), queryFn: () => adminUsersService.getById(id), enabled: Boolean(id) });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminUsersService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.users() })
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminUsersService.update>[1] }) => adminUsersService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.users() })
  });
}

export function useUpdateUserPermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, permissionIds }: { id: string; permissionIds: string[] }) => adminUsersService.updatePermissions(id, permissionIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.users() })
  });
}

export function useAdminPermissionsQuery() {
  return useQuery({ queryKey: adminQueryKeys.permissions(), queryFn: adminUsersService.listPermissions });
}
