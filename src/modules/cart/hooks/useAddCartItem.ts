'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartQueryKeys } from '@/modules/cart/constants/cart-query-key.constant';
import { cartService } from '@/modules/cart/services/cart.service';

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartService.addItem,
    onSuccess: (cart) => queryClient.setQueryData(cartQueryKeys.detail(), cart)
  });
}
