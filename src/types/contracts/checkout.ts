import type { PaymentMethod } from './enums';
import type { OrderDto } from './order';

export type CheckoutRequest = {
  addressId?: string;
  recipientName?: string;
  recipientPhone?: string;
  shippingAddress?: string;
  shippingNote?: string;
  paymentMethod: PaymentMethod;
};

export type CheckoutResultDto = {
  order: OrderDto;
  paymentUrl: string;
};
