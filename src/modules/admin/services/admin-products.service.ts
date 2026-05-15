import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminProductListQuery, ApiSuccess, PaginatedResponse, ProductDto } from '@/types/contracts';

export const adminProductsService = {
  list: async (params: AdminProductListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<ProductDto[]> | PaginatedResponse<ProductDto>>('/admin/products', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<ProductDto>>(`/admin/products/${id}`);
    return unwrapApiData(response.data);
  },
  create: async (payload: Omit<ProductDto, 'id'>) => {
    const response = await httpClient.post<ApiSuccess<ProductDto>>('/admin/products', payload);
    return unwrapApiData(response.data);
  },
  update: async (id: string, payload: Partial<ProductDto>) => {
    const response = await httpClient.patch<ApiSuccess<ProductDto>>(`/admin/products/${id}`, payload);
    return unwrapApiData(response.data);
  },
  disable: async (id: string) => {
    const response = await httpClient.delete<ApiSuccess<{ deleted: boolean }>>(`/admin/products/${id}`);
    return unwrapApiData(response.data);
  }
};
