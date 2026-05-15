'use client';

import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from '@/modules/products/constants/product-query-key.constant';
import { productService } from '@/modules/products/services/products.service';

export function useProductDetailQuery(slug: string) {
  return useQuery({
    queryKey: productQueryKeys.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug)
  });
}
