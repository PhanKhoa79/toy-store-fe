'use client';

import { useQuery } from '@tanstack/react-query';
import { cartQueryKeys } from '@/modules/cart/constants/cart-query-key.constant';
import { cartService } from '@/modules/cart/services/cart.service';

export function useCartQuery() {
  return useQuery({ queryKey: cartQueryKeys.detail(), queryFn: cartService.getCart });
}
