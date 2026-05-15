import type { ID, VndAmount } from './common';
import type { ProductDto } from './catalog';

export type CartItemDto = {
  id: ID;
  product: ProductDto;
  quantity: number;
  unitPrice: VndAmount;
  lineTotal: VndAmount;
};

export type CartDto = {
  id?: ID;
  items: CartItemDto[];
  subtotalAmount: VndAmount;
};

export type AddCartItemRequest = {
  productId: ID;
  quantity: number;
};

export type UpdateCartItemRequest = {
  quantity: number;
};
