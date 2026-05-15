'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '@/modules/auth/constants/auth-query-key.constant';
import { authService } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (session) => {
      setUser(session.user);
      queryClient.setQueryData(authQueryKeys.me(), session.user);
    }
  });
}
