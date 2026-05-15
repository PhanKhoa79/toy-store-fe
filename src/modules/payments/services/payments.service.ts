import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, PaymentResultDto } from '@/types/contracts';

export const paymentsService = {
  getResult: async (params: Record<string, string>) => {
    const response = await httpClient.get<ApiSuccess<PaymentResultDto>>('/payments/result/summary', { params });
    return unwrapApiData(response.data);
  }
};
