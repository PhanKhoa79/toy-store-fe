import type { Metadata } from 'next';
import { WishlistPage } from '@/modules/customer-account/pages/WishlistPage';

export const metadata: Metadata = {
  title: 'Yêu thích - ToyStore',
  description: 'Danh sách sản phẩm yêu thích của bạn.'
};

export default function Page() {
  return <WishlistPage />;
}
