import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, BrandDto, CategoryDto, HomepageSlideDto, ProductDto } from '@/types/contracts';

export const homeService = {
  getSlides: async () => {
    const response = await httpClient.get<ApiSuccess<HomepageSlideDto[]>>('/homepage-slides');
    return unwrapApiData(response.data);
  },
  getCategories: async () => {
    const response = await httpClient.get<ApiSuccess<CategoryDto[]>>('/categories');
    return unwrapApiData(response.data);
  },
  getBrands: async () => {
    const response = await httpClient.get<ApiSuccess<BrandDto[]>>('/brands');
    return unwrapApiData(response.data);
  },
  getFeaturedProducts: async () => {
    const response = await httpClient.get<ApiSuccess<ProductDto[]>>('/products', { params: { page: 1, pageSize: 6 } });
    return unwrapApiData(response.data);
  }
};
