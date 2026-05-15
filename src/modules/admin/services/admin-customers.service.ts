import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminCustomerDto, AdminListQuery, ApiSuccess, PaginatedResponse } from '@/types/contracts';

export const adminCustomersService = {
  list: async (params: AdminListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<AdminCustomerDto[]> | PaginatedResponse<AdminCustomerDto>>('/admin/customers', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<AdminCustomerDto>>(`/admin/customers/${id}`);
    return unwrapApiData(response.data);
  },
  lock: async (id: string) => {
    const response = await httpClient.patch<ApiSuccess<AdminCustomerDto>>(`/admin/customers/${id}/lock`);
    return unwrapApiData(response.data);
  },
  unlock: async (id: string) => {
    const response = await httpClient.patch<ApiSuccess<AdminCustomerDto>>(`/admin/customers/${id}/unlock`);
    return unwrapApiData(response.data);
  }
};
