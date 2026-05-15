import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, CancelOrderRequest, OrderDto } from '@/types/contracts';

export const ordersService = {
  listMyOrders: async () => {
    const response = await httpClient.get<ApiSuccess<OrderDto[]>>('/me/orders');
    return unwrapApiData(response.data);
  },
  getMyOrder: async (orderCode: string) => {
    const response = await httpClient.get<ApiSuccess<OrderDto>>(`/me/orders/${orderCode}`);
    return unwrapApiData(response.data);
  },
  cancelMyOrder: async (orderCode: string, payload: CancelOrderRequest) => {
    const response = await httpClient.patch<ApiSuccess<OrderDto>>(`/me/orders/${orderCode}/cancel`, payload);
    return unwrapApiData(response.data);
  }
};
