'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminReviewsService } from '@/modules/admin/services/admin-reviews.service';
import type { AdminReviewListQuery, ReviewStatus } from '@/types/contracts';

export function useAdminReviewsQuery(params: AdminReviewListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.reviews(), queryFn: () => adminReviewsService.list(params) });
}

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, moderationNote }: { id: string; status: Exclude<ReviewStatus, 'pending'>; moderationNote?: string }) => adminReviewsService.updateStatus(id, status, moderationNote),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.reviews() })
  });
}
