import { httpClient } from '@/lib/api/http-client';
import type { ApiSuccessResponse, PaginatedResponse } from '@/contracts/api';
import type { ProductDto, ProductListQuery } from '@/contracts/catalog';

export async function getProducts(params: ProductListQuery = {}) {
  const response = await httpClient.get<PaginatedResponse<ProductDto>>('/products', { params });
  return response.data;
}

export async function getProductBySlug(slug: string) {
  const response = await httpClient.get<ApiSuccessResponse<ProductDto>>(`/products/${slug}`);
  return response.data.data;
}
