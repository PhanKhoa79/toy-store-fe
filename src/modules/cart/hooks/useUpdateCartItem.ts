'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartQueryKeys } from '@/modules/cart/constants/cart-query-key.constant';
import { cartService } from '@/modules/cart/services/cart.service';

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => cartService.updateItem(cartItemId, { quantity }),
    onSuccess: (cart) => queryClient.setQueryData(cartQueryKeys.detail(), cart)
  });
}
