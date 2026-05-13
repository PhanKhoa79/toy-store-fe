import { httpClient } from '@/lib/api/http-client';
import type { ApiSuccess, PaginatedResponse, ProductDto, ProductListQuery } from '@/types/contracts';

export const productService = {
  getProducts: async (params: ProductListQuery = {}) => {
    const response = await httpClient.get<PaginatedResponse<ProductDto>>('/products', { params });
    return response.data;
  },
  getProductBySlug: async (slug: string) => {
    const response = await httpClient.get<ApiSuccess<ProductDto>>(`/products/${slug}`);
    return response.data.data;
  }
};
