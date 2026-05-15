import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminListQuery, ApiSuccess, CategoryDto, PaginatedResponse } from '@/types/contracts';

export const adminCategoriesService = {
  list: async (params: AdminListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<CategoryDto[]> | PaginatedResponse<CategoryDto>>('/admin/categories', { params });
    return unwrapPaginatedResponse(response.data);
  },
  create: async (payload: Omit<CategoryDto, 'id'>) => {
    const response = await httpClient.post<ApiSuccess<CategoryDto>>('/admin/categories', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<CategoryDto>) => {
    const response = await httpClient.patch<ApiSuccess<CategoryDto>>(`/admin/categories/${id}`, payload);
    return unwrapApiData(response.data);
  },
  disable: async (id: string) => {
    const response = await httpClient.delete<ApiSuccess<{ deleted: boolean }>>(`/admin/categories/${id}`);
    return unwrapApiData(response.data);
  }
};
