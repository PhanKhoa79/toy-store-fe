'use client';

import { useAuthStore } from '@/stores/auth-store';

export type Permission = {
  module: string;
  action: string;
};

type CanAccessProps = {
  permission?: Permission;
  role?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function CanAccess({ permission, role, fallback = null, children }: CanAccessProps) {
  const { user } = useAuthStore();

  if (!user) return fallback;

  if (role && !role.includes(user.role)) {
    return fallback;
  }

  if (permission) {
    const permissions = (user as unknown as { permissions?: PermissionDto[] }).permissions ?? [];
    const hasPermission = permissions.some(
      (p) => p.module === permission.module && p.action === permission.action
    );
    if (!hasPermission && user.role !== 'admin') {
      return fallback;
    }
  }

  return children;
}

type PermissionDto = {
  id: string;
  module: string;
  action: string;
  description?: string | null;
};
