import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminOrderListQuery, ApiSuccess, OrderDto, OrderStatus, PaginatedResponse } from '@/types/contracts';

export const adminOrdersService = {
  list: async (params: AdminOrderListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<OrderDto[]> | PaginatedResponse<OrderDto>>('/admin/orders', { params });
    return unwrapPaginatedResponse(response.data);
  },
  getById: async (id: string) => {
    const response = await httpClient.get<ApiSuccess<OrderDto>>(`/admin/orders/${id}`);
    return unwrapApiData(response.data);
  },
  updateStatus: async (id: string, orderStatus: OrderStatus, cancelledReason?: string) => {
    const response = await httpClient.patch<ApiSuccess<OrderDto>>(`/admin/orders/${id}/status`, { orderStatus, ...(cancelledReason ? { cancelledReason } : {}) });
    return unwrapApiData(response.data);
  }
};
