import type { Metadata } from 'next';
import { HomePage } from '@/modules/home';

export const metadata: Metadata = {
  title: 'ToyStore - Cửa hàng đồ chơi trẻ em',
  description: 'Khám phá bộ sưu tập đồ chơi chất lượng cao cho trẻ em. Giao hàng toàn quốc, đổi trả dễ dàng.'
};

export default function Page() {
  return <HomePage />;
}
