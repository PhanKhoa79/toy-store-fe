import type { Metadata } from 'next';
import { LoginPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Đăng nhập - ToyStore',
  description: 'Đăng nhập vào tài khoản ToyStore.'
};

export default function Page() {
  return <LoginPage />;
}
