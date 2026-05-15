import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminListQuery, ApiSuccess, HomepageSlideDto, PaginatedResponse } from '@/types/contracts';

export const adminHomepageSlidesService = {
  list: async (params: AdminListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<HomepageSlideDto[]> | PaginatedResponse<HomepageSlideDto>>('/admin/homepage-slides', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<HomepageSlideDto>>(`/admin/homepage-slides/${id}`);
    return unwrapApiData(response.data);
  },
  create: async (payload: Omit<HomepageSlideDto, 'id'>) => {
    const response = await httpClient.post<ApiSuccess<HomepageSlideDto>>('/admin/homepage-slides', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<HomepageSlideDto>) => {
    const response = await httpClient.patch<ApiSuccess<HomepageSlideDto>>(`/admin/homepage-slides/${id}`, payload);
    return unwrapApiData(response.data);
  },
  disable: async (id: string) => {
    const response = await httpClient.delete<ApiSuccess<{ deleted: boolean }>>(`/admin/homepage-slides/${id}`);
    return unwrapApiData(response.data);
  }
};
