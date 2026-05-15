'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminOrdersService } from '@/modules/admin/services/admin-orders.service';
import type { AdminOrderListQuery, OrderStatus } from '@/types/contracts';

export function useAdminOrdersQuery(params: AdminOrderListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.orders(), queryFn: () => adminOrdersService.list(params) });
}

export function useAdminOrderDetailQuery(id: string) {
  return useQuery({ queryKey: adminQueryKeys.order(id), queryFn: () => adminOrdersService.getById(id), enabled: Boolean(id) });
}

export function useUpdateAdminOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, orderStatus, cancelledReason }: { id: string; orderStatus: OrderStatus; cancelledReason?: string }) => adminOrdersService.updateStatus(id, orderStatus, cancelledReason),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.orders() });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.order(vars.id) });
    }
  });
}
