import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { ApiSuccess, CreateReviewRequest, PaginatedResponse, ReviewDto } from '@/types/contracts';

export const reviewsService = {
  listByProduct: async (productId: string) => {
    const response = await httpClient.get<ApiSuccess<ReviewDto[]> | PaginatedResponse<ReviewDto>>(`/products/${productId}/reviews`);
    return unwrapPaginatedResponse(response.data);
  },
  create: async (productId: string, payload: CreateReviewRequest) => {
    const response = await httpClient.post<ApiSuccess<ReviewDto>>(`/products/${productId}/reviews`, payload);
    return unwrapApiData(response.data);
  }
};
