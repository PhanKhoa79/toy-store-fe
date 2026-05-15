'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderQueryKeys } from '@/modules/orders/constants/order-query-key.constant';
import { ordersService } from '@/modules/orders/services/orders.service';

export function useMyOrdersQuery() {
  return useQuery({ queryKey: orderQueryKeys.lists(), queryFn: ordersService.listMyOrders });
}

export function useMyOrderDetailQuery(orderCode: string) {
  return useQuery({
    queryKey: orderQueryKeys.detail(orderCode),
    queryFn: () => ordersService.getMyOrder(orderCode),
    enabled: Boolean(orderCode)
  });
}

export function useCancelMyOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderCode, cancelledReason }: { orderCode: string; cancelledReason: string }) => ordersService.cancelMyOrder(orderCode, { cancelledReason }),
    onSuccess: (order) => {
      queryClient.setQueryData(orderQueryKeys.detail(order.orderCode), order);
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists() });
    }
  });
}
