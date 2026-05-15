import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminListQuery, AdminUserDto, ApiSuccess, PaginatedResponse, PermissionDto } from '@/types/contracts';

export const adminUsersService = {
  list: async (params: AdminListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<AdminUserDto[]> | PaginatedResponse<AdminUserDto>>('/admin/users', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<AdminUserDto>>(`/admin/users/${id}`);
    return unwrapApiData(response.data);
  },
  create: async (payload: Partial<AdminUserDto> & { password: string }) => {
    const response = await httpClient.post<ApiSuccess<AdminUserDto>>('/admin/users', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<AdminUserDto>) => {
    const response = await httpClient.patch<ApiSuccess<AdminUserDto>>(`/admin/users/${id}`, payload);
    return unwrapApiData(response.data);
  },
  updatePermissions: async (id: string, permissionIds: string[]) => {
    const response = await httpClient.patch<ApiSuccess<AdminUserDto>>(`/admin/users/${id}/permissions`, { permissionIds });
    return unwrapApiData(response.data);
  },
  listPermissions: async () => {
    const response = await httpClient.get<ApiSuccess<PermissionDto[]>>('/admin/permissions');
    return unwrapApiData(response.data);
  }
};
