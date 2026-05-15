import type { Metadata } from 'next';
import { PaymentResultPage } from '@/modules/payments/pages/PaymentResultPage';

export const metadata: Metadata = {
  title: 'Kết quả thanh toán - ToyStore',
  description: 'Xem kết quả thanh toán đơn hàng của bạn.'
};

export default function Page() {
  return <PaymentResultPage />;
}
