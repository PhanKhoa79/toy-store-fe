import type { Metadata } from 'next';
import { CheckoutPage } from '@/modules/checkout/pages/CheckoutPage';

export const metadata: Metadata = {
  title: 'Thanh toán - ToyStore',
  description: 'Hoàn tất đơn hàng của bạn.'
};

export default function Page() {
  return <CheckoutPage />;
}
