import type { PaymentMethod, PaymentStatus } from './enums';
import type { ID, VndAmount } from './common';

export type PaymentDto = {
  id: ID;
  orderId: ID;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  amount: VndAmount;
  transactionRef: string;
  vnpayTransactionNo?: string | null;
  vnpayResponseCode?: string | null;
  vnpayBankCode?: string | null;
};

export type PaymentResultDto = {
  paymentId: ID;
  orderCode: string;
  transactionRef: string;
  responseCode?: string;
  success: boolean;
  paymentStatus: PaymentStatus;
  orderStatus: string;
};
