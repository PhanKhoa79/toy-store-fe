import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, CheckoutRequest, CheckoutResultDto } from '@/types/contracts';

export const checkoutService = {
  checkout: async (payload: CheckoutRequest) => {
    const response = await httpClient.post<ApiSuccess<CheckoutResultDto>>('/checkout', payload);
    return unwrapApiData(response.data);
  }
};
