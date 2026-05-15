import type { Metadata } from 'next';
import { CartPage } from '@/modules/cart';

export const metadata: Metadata = {
  title: 'Giỏ hàng - ToyStore',
  description: 'Xem và quản lý giỏ hàng của bạn.'
};

export default function Page() {
  return <CartPage />;
}
