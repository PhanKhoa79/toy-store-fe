'use client';

import { hasPermission } from '@/modules/auth/utils/auth-redirect.util';
import { useAuthStore } from '@/stores/auth-store';
import type { UserRole } from '@/types/contracts';

type CanAccessProps = {
  children: React.ReactNode;
  allowedRoles?: readonly UserRole[];
  permission?: {
    module: string;
    action: string;
  };
  fallback?: React.ReactNode;
};

export function CanAccess({ children, allowedRoles, permission, fallback = null }: CanAccessProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) return fallback;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return fallback;
  }

  if (permission && !hasPermission(user, permission.module, permission.action)) {
    return fallback;
  }

  return children;
}
