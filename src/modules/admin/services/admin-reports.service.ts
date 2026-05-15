import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, OrderSummaryDto, RevenueSummaryDto, TopProductDto } from '@/types/contracts';

export const adminReportsService = {
  revenueSummary: async () => {
    const response = await httpClient.get<ApiSuccess<RevenueSummaryDto>>('/admin/reports/revenue-summary');
    return unwrapApiData(response.data);
  },
  orderSummary: async () => {
    const response = await httpClient.get<ApiSuccess<OrderSummaryDto[]>>('/admin/reports/order-summary');
    return unwrapApiData(response.data);
  },
  topProducts: async () => {
    const response = await httpClient.get<ApiSuccess<TopProductDto[]>>('/admin/reports/top-products');
    return unwrapApiData(response.data);
  }
};
