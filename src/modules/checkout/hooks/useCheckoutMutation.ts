'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartQueryKeys } from '@/modules/cart/constants/cart-query-key.constant';
import { checkoutService } from '@/modules/checkout/services/checkout.service';

export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkoutService.checkout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartQueryKeys.all })
  });
}
