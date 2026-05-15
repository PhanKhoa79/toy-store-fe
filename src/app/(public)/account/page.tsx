import type { Metadata } from 'next';
import { ProfilePage } from '@/modules/customer-account/pages/ProfilePage';

export const metadata: Metadata = {
  title: 'Tài khoản - ToyStore',
  description: 'Quản lý thông tin tài khoản của bạn.'
};

export default function Page() {
  return <ProfilePage />;
}
