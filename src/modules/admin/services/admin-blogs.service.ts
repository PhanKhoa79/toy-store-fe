import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminBlogListQuery, ApiSuccess, BlogDto, PaginatedResponse } from '@/types/contracts';

export const adminBlogsService = {
  list: async (params: AdminBlogListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<BlogDto[]> | PaginatedResponse<BlogDto>>('/admin/blogs', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<BlogDto>>(`/admin/blogs/${id}`);
    return unwrapApiData(response.data);
  },
  create: async (payload: Partial<BlogDto>) => {
    const response = await httpClient.post<ApiSuccess<BlogDto>>('/admin/blogs', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<BlogDto>) => {
    const response = await httpClient.patch<ApiSuccess<BlogDto>>(`/admin/blogs/${id}`, payload);
    return unwrapApiData(response.data);
  },
  publish: async (id: string) => {
    const response = await httpClient.patch<ApiSuccess<BlogDto>>(`/admin/blogs/${id}/publish`);
    return unwrapApiData(response.data);
  },
  archive: async (id: string) => {
    const response = await httpClient.patch<ApiSuccess<BlogDto>>(`/admin/blogs/${id}/archive`);
    return unwrapApiData(response.data);
  }
};
