'use client';

import { useQuery } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminReportsService } from '@/modules/admin/services/admin-reports.service';

export function useRevenueSummaryQuery() {
  return useQuery({ queryKey: adminQueryKeys.reports(), queryFn: adminReportsService.revenueSummary });
}

export function useOrderSummaryQuery() {
  return useQuery({ queryKey: [...adminQueryKeys.reports(), 'order-summary'], queryFn: adminReportsService.orderSummary });
}

export function useTopProductsQuery() {
  return useQuery({ queryKey: [...adminQueryKeys.reports(), 'top-products'], queryFn: adminReportsService.topProducts });
}
