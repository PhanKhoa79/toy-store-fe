import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { AddWishlistItemRequest, AddressFormRequest, ApiSuccess, CustomerAddressDto, CustomerProfileDto, UpdateProfileRequest, WishlistItemDto } from '@/types/contracts';

export const customerAccountService = {
  getProfile: async () => {
    const response = await httpClient.get<ApiSuccess<CustomerProfileDto>>('/me/profile');
    return unwrapApiData(response.data);
  },
  updateProfile: async (payload: UpdateProfileRequest) => {
    const response = await httpClient.patch<ApiSuccess<CustomerProfileDto>>('/me/profile', payload);
    return unwrapApiData(response.data);
  },
  listAddresses: async () => {
    const response = await httpClient.get<ApiSuccess<CustomerAddressDto[]>>('/me/addresses');
    return unwrapApiData(response.data);
  },
  createAddress: async (payload: AddressFormRequest) => {
    const response = await httpClient.post<ApiSuccess<CustomerAddressDto>>('/me/addresses', payload);
    return unwrapApiData(response.data);
  },
  updateAddress: async (id: string, payload: AddressFormRequest) => {
    const response = await httpClient.patch<ApiSuccess<CustomerAddressDto>>(`/me/addresses/${id}`, payload);
    return unwrapApiData(response.data);
  },
  deleteAddress: async (id: string) => {
    const response = await httpClient.delete<ApiSuccess<{ deleted: boolean }>>(`/me/addresses/${id}`);
    return unwrapApiData(response.data);
  },
  setDefaultAddress: async (id: string) => {
    const response = await httpClient.patch<ApiSuccess<CustomerAddressDto>>(`/me/addresses/${id}/default`);
    return unwrapApiData(response.data);
  },
  listWishlist: async () => {
    const response = await httpClient.get<ApiSuccess<WishlistItemDto[]>>('/me/wishlist');
    return unwrapApiData(response.data);
  },
  addWishlistItem: async (payload: AddWishlistItemRequest) => {
    const response = await httpClient.post<ApiSuccess<WishlistItemDto>>('/me/wishlist/items', payload);
    return unwrapApiData(response.data);
  },
  removeWishlistItem: async (productId: string) => {
    const response = await httpClient.delete<ApiSuccess<{ removed: boolean }>>(`/me/wishlist/items/${productId}`);
    return unwrapApiData(response.data);
  }
};
