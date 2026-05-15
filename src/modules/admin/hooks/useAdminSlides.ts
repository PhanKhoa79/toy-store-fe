'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminQueryKeys } from '@/modules/admin/constants/admin-query-key.constant';
import { adminHomepageSlidesService } from '@/modules/admin/services/admin-homepage-slides.service';

import type { AdminListQuery } from '@/types/contracts';

export function useAdminSlidesQuery(params: AdminListQuery = {}) {
  return useQuery({ queryKey: adminQueryKeys.slides(), queryFn: () => adminHomepageSlidesService.list(params) });
}

export function useCreateAdminSlide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminHomepageSlidesService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.slides() })
  });
}

export function useUpdateAdminSlide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof adminHomepageSlidesService.update>[1] }) => adminHomepageSlidesService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.slides() })
  });
}

export function useDisableAdminSlide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminHomepageSlidesService.disable,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.slides() })
  });
}
