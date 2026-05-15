'use client';

import { useQuery } from '@tanstack/react-query';
import { blogQueryKeys } from '@/modules/blogs/constants/blog-query-key.constant';
import { blogsService } from '@/modules/blogs/services/blogs.service';

export function usePublicBlogsQuery() {
  return useQuery({ queryKey: blogQueryKeys.lists(), queryFn: blogsService.listPublicBlogs });
}

export function usePublicBlogDetailQuery(slug: string) {
  return useQuery({ queryKey: blogQueryKeys.detail(slug), queryFn: () => blogsService.getPublicBlogBySlug(slug), enabled: Boolean(slug) });
}
