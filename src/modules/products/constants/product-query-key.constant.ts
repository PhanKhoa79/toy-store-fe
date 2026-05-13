import type { ProductListQuery } from '@/types/contracts';

export const productQueryKeys = {
  all: ['products'] as const,
  lists: () => [...productQueryKeys.all, 'list'] as const,
  list: (params: ProductListQuery) => [...productQueryKeys.lists(), params] as const,
  details: () => [...productQueryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productQueryKeys.details(), slug] as const
};
