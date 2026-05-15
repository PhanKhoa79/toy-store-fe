'use client';

import { useQuery } from '@tanstack/react-query';
import { authQueryKeys } from '@/modules/auth/constants/auth-query-key.constant';
import { authService } from '@/modules/auth/services/auth.service';

export function useAuthMeQuery(enabled = true) {
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: authService.me,
    enabled,
    retry: false
  });
}
