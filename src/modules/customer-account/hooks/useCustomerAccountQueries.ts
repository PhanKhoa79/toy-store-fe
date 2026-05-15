'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customerAccountQueryKeys } from '@/modules/customer-account/constants/customer-account-query-key.constant';
import { customerAccountService } from '@/modules/customer-account/services/customer-account.service';

export function useCustomerProfileQuery() {
  return useQuery({ queryKey: customerAccountQueryKeys.profile(), queryFn: customerAccountService.getProfile });
}

export function useUpdateCustomerProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.updateProfile,
    onSuccess: (profile) => queryClient.setQueryData(customerAccountQueryKeys.profile(), profile)
  });
}

export function useCustomerAddressesQuery() {
  return useQuery({ queryKey: customerAccountQueryKeys.addresses(), queryFn: customerAccountService.listAddresses });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.createAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerAccountQueryKeys.addresses() })
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.setDefaultAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerAccountQueryKeys.addresses() })
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.deleteAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerAccountQueryKeys.addresses() })
  });
}

export function useWishlistQuery() {
  return useQuery({ queryKey: customerAccountQueryKeys.wishlist(), queryFn: customerAccountService.listWishlist });
}

export function useAddWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.addWishlistItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerAccountQueryKeys.wishlist() })
  });
}

export function useRemoveWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerAccountService.removeWishlistItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: customerAccountQueryKeys.wishlist() })
  });
}
