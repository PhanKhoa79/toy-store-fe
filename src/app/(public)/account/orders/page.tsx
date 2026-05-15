import type { Metadata } from 'next';
import { OrdersPage } from '@/modules/customer-account/pages/OrdersPage';

export const metadata: Metadata = {
  title: 'Đơn hàng của tôi - ToyStore',
  description: 'Xem lịch sử đơn hàng của bạn.'
};

export default function Page() {
  return <OrdersPage />;
}
