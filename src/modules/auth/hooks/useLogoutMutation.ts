'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authQueryKeys } from '@/modules/auth/constants/auth-query-key.constant';
import { authService } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      clearUser();
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    }
  });
}
