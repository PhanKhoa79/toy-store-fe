import type { Metadata } from 'next';
import { RegisterPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Đăng ký - ToyStore',
  description: 'Tạo tài khoản mới tại ToyStore.'
};

export default function Page() {
  return <RegisterPage />;
}
