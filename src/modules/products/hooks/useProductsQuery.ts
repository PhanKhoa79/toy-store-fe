'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/modules/products/services/products.service';
import { productQueryKeys } from '@/modules/products/constants/product-query-key.constant';
import type { ProductListQuery } from '@/types/contracts';

export function useProductsQuery(query: ProductListQuery = {}) {
  return useQuery({
    queryKey: productQueryKeys.list(query),
    queryFn: () => productService.getProducts(query)
  });
}
