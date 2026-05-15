'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { Button } from '@/components/ui';
import { useI18n } from '@/i18n';
import { useAuthMeQuery } from '@/modules/auth/hooks/useAuthMeQuery';
import { LogoutButton } from '@/modules/auth/components/LogoutButton';
import { getDefaultAuthenticatedPath } from '@/modules/auth/utils/auth-redirect.util';
import { useAuthStore } from '@/stores/auth-store';

export function PublicHeader() {
  const { dictionary } = useI18n();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { data } = useAuthMeQuery(!user);

  useEffect(() => {
    if (data && data.id !== user?.id) {
      setUser(data);
    }
  }, [data, setUser, user?.id]);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-black text-slate-950">
          {dictionary.common.appName}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link href="/products">{dictionary.home.products}</Link>
          <Link href="/cart">{dictionary.home.cart}</Link>
          {user ? (
            <>
              <Link href={getDefaultAuthenticatedPath(user)}>{user.fullName}</Link>
              <LogoutButton label={dictionary.auth.logout} />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">{dictionary.auth.submitLogin}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">{dictionary.auth.submitRegister}</Link>
              </Button>
            </>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
