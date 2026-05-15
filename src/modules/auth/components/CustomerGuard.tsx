'use client';

import { AuthGuard } from '@/modules/auth/components/AuthGuard';

export function CustomerGuard({ children }: { children: React.ReactNode }) {
  return <AuthGuard allowedRoles={['customer']}>{children}</AuthGuard>;
}
