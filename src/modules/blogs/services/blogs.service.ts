import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess, BlogDto } from '@/types/contracts';

export const blogsService = {
  listPublicBlogs: async () => {
    const response = await httpClient.get<ApiSuccess<BlogDto[]>>('/blogs');
    return unwrapApiData(response.data);
  },
  getPublicBlogBySlug: async (slug: string) => {
    const response = await httpClient.get<ApiSuccess<BlogDto>>(`/blogs/${slug}`);
    return unwrapApiData(response.data);
  }
};
