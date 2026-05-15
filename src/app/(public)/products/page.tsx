import type { Metadata } from 'next';
import { ProductsPage } from '@/modules/products';

export const metadata: Metadata = {
  title: 'Sản phẩm - ToyStore',
  description: 'Danh sách sản phẩm đồ chơi chất lượng cao cho trẻ em.'
};

export default function Page() {
  return <ProductsPage />;
}
