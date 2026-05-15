'use client';

import { useQuery } from '@tanstack/react-query';
import { paymentsService } from '@/modules/payments/services/payments.service';

export function usePaymentResultQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['payments', 'result', params] as const,
    queryFn: () => paymentsService.getResult(params),
    enabled: Object.keys(params).length > 0,
    retry: false
  });
}
