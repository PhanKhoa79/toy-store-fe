'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewQueryKeys } from '@/modules/reviews/constants/review-query-key.constant';
import { reviewsService } from '@/modules/reviews/services/reviews.service';

export function useProductReviewsQuery(productId: string) {
  return useQuery({
    queryKey: reviewQueryKeys.product(productId),
    queryFn: () => reviewsService.listByProduct(productId),
    enabled: Boolean(productId)
  });
}

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof reviewsService.create>[1]) => reviewsService.create(productId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reviewQueryKeys.product(productId) })
  });
}
