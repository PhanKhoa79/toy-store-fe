import type { ID, ISODateString } from './common';
import type { ProductDto } from './catalog';

export type CustomerProfileDto = {
  id: ID;
  email: string;
  fullName: string;
  phone?: string | null;
  role?: string;
  isActive?: boolean;
};

export type UpdateProfileRequest = {
  fullName: string;
  phone?: string;
};

export type CustomerAddressDto = {
  id: ID;
  userId: ID;
  recipientName: string;
  recipientPhone: string;
  addressLine: string;
  note?: string | null;
  isDefault: boolean;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};

export type AddressFormRequest = {
  recipientName: string;
  recipientPhone: string;
  addressLine: string;
  note?: string;
};

export type WishlistItemDto = {
  id: ID;
  userId?: ID;
  productId: ID;
  product: ProductDto;
  createdAt?: ISODateString;
};

export type AddWishlistItemRequest = {
  productId: ID;
};
