import type { ApiSuccess, PaginatedResponse, PaginationMeta } from '@/types/contracts';

export function unwrapApiData<T>(response: ApiSuccess<T> | T): T {
  if (isApiSuccess(response)) {
    return response.data;
  }

  return response;
}

export function unwrapPaginatedResponse<T>(response: ApiSuccess<T[]> | PaginatedResponse<T>): PaginatedResponse<T> {
  if (isApiSuccessResponse<T[]>(response)) {
    return {
      data: response.data,
      meta: response.meta ?? createEmptyPaginationMeta(response.data.length)
    };
  }

  return response;
}

function isApiSuccess<T>(response: ApiSuccess<T> | T): response is ApiSuccess<T> {
  return isApiSuccessResponse<T>(response);
}

function isApiSuccessResponse<T>(response: unknown): response is ApiSuccess<T> {
  return Boolean(response && typeof response === 'object' && 'success' in response && 'data' in response);
}

function createEmptyPaginationMeta(total: number): PaginationMeta {
  return {
    page: 1,
    pageSize: total,
    total,
    totalPages: total > 0 ? 1 : 0,
    hasNextPage: false,
    hasPreviousPage: false
  };
}
