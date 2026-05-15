'use client';

import { AuthGuard } from '@/modules/auth/components/AuthGuard';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <AuthGuard allowedRoles={['staff', 'admin']}>{children}</AuthGuard>;
}
