import type { CurrentUser } from '@/types/contracts';

export function getDefaultAuthenticatedPath(user: CurrentUser) {
  if (user.role === 'admin' || user.role === 'staff') {
    return '/admin';
  }

  return '/';
}

export function hasPermission(user: CurrentUser | null | undefined, module: string, action: string) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.permissions.some((permission) => permission.module === module && permission.action === action);
}
