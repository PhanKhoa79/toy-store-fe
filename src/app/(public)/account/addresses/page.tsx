import type { Metadata } from 'next';
import { AddressesPage } from '@/modules/customer-account/pages/AddressesPage';

export const metadata: Metadata = {
  title: 'Địa chỉ của tôi - ToyStore',
  description: 'Quản lý địa chỉ giao hàng của bạn.'
};

export default function Page() {
  return <AddressesPage />;
}
