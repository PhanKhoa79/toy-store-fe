import { httpClient, unwrapApiData, unwrapPaginatedResponse } from '@/lib/api/http-client';
import type { AdminReviewListQuery, ApiSuccess, PaginatedResponse, ReviewDto, ReviewStatus } from '@/types/contracts';

export const adminReviewsService = {
  list: async (params: AdminReviewListQuery = {}) => {
    const response = await httpClient.get<ApiSuccess<ReviewDto[]> | PaginatedResponse<ReviewDto>>('/admin/reviews', { params });
    return unwrapPaginatedResponse(response.data);
  },
  updateStatus: async (id: string, status: Exclude<ReviewStatus, 'pending'>, moderationNote?: string) => {
    const response = await httpClient.patch<ApiSuccess<ReviewDto>>(`/admin/reviews/${id}/status`, { status, ...(moderationNote ? { moderationNote } : {}) });
    return unwrapApiData(response.data);
  }
};
