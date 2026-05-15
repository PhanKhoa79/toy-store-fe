'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoading, UnauthorizedState } from '@/components/common';
import { useAuthMeQuery } from '@/modules/auth/hooks/useAuthMeQuery';
import { hasPermission } from '@/modules/auth/utils/auth-redirect.util';
import { useAuthStore } from '@/stores/auth-store';
import type { UserRole } from '@/types/contracts';

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: readonly UserRole[];
  permission?: {
    module: string;
    action: string;
  };
};

export function AuthGuard({ children, allowedRoles, permission }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const { data: user, isLoading, isError } = useAuthMeQuery();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  useEffect(() => {
    if (!isError) return;
    clearUser();
    const queryString = searchParams.toString();
    const next = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [clearUser, isError, pathname, router, searchParams]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!user) {
    return <PageLoading />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <UnauthorizedState />;
  }

  if (permission && !hasPermission(user, permission.module, permission.action)) {
    return <UnauthorizedState />;
  }

  return children;
}
