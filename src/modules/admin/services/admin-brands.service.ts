import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminListQuery, ApiSuccess, BrandDto, PaginatedResponse } from '@/types/contracts';

export const adminBrandsService = {
  list: async (params: AdminListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<BrandDto[]> | PaginatedResponse<BrandDto>>('/admin/brands', { params });
    return unwrapPaginatedResponse(response.data);
  },
  create: async (payload: Omit<BrandDto, 'id'>) => {
    const response = await httpClient.post<ApiSuccess<BrandDto>>('/admin/brands', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<BrandDto>) => {
    const response = await httpClient.patch<ApiSuccess<BrandDto>>(`/admin/brands/${id}`, payload);
    return unwrapApiData(response.data);
  },
  disable: async (id: string) => {
    const response = await httpClient.delete<ApiSuccess<{ deleted: boolean }>>(`/admin/brands/${id}`);
    return unwrapApiData(response.data);
  }
};
