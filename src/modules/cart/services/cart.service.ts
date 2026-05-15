import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { AddCartItemRequest, ApiSuccess, CartDto, UpdateCartItemRequest } from '@/types/contracts';

export const cartService = {
  getCart: async () => {
    const response = await httpClient.get<ApiSuccess<CartDto>>('/cart');
    return unwrapApiData(response.data);
  },
  addItem: async (payload: AddCartItemRequest) => {
    const response = await httpClient.post<ApiSuccess<CartDto>>('/cart/items', payload);
    return unwrapApiData(response.data);
  },
  updateItem: async (cartItemId: string, payload: UpdateCartItemRequest) => {
    const response = await httpClient.patch<ApiSuccess<CartDto>>(`/cart/items/${cartItemId}`, payload);
    return unwrapApiData(response.data);
  },
  removeItem: async (cartItemId: string) => {
    const response = await httpClient.delete<ApiSuccess<CartDto>>(`/cart/items/${cartItemId}`);
    return unwrapApiData(response.data);
  },
  validateCart: async () => {
    const response = await httpClient.post<ApiSuccess<CartDto>>('/cart/validate');
    return unwrapApiData(response.data);
  }
};
