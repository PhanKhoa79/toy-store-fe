import type { OrderStatus, PaymentStatus } from './enums';
import type { ID, ISODateString, VndAmount } from './common';
import type { PaymentDto } from './payment';

export type OrderItemDto = {
  id: ID;
  orderId: ID;
  productId: ID;
  productName: string;
  productSku: string;
  unitPrice: VndAmount;
  quantity: number;
  lineTotal: VndAmount;
};

export type OrderDto = {
  id: ID;
  orderCode: string;
  userId: ID;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  shippingNote?: string | null;
  subtotalAmount: VndAmount;
  shippingFee: VndAmount;
  totalAmount: VndAmount;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  cancelledReason?: string | null;
  items?: OrderItemDto[];
  payments?: PaymentDto[];
  createdAt: ISODateString;
  updatedAt?: ISODateString;
};

export type CancelOrderRequest = {
  cancelledReason: string;
};
