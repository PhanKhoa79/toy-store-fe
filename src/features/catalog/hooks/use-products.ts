'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/features/catalog/api/catalog-api';
import type { ProductListQuery } from '@/contracts/catalog';

export function useProducts(query: ProductListQuery = {}) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts(query)
  });
}
