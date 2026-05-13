'use client';

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useI18n } from '@/i18n';

export function PublicHeader() {
  const { dictionary } = useI18n();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-black text-slate-950">
          {dictionary.common.appName}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link href="/products">{dictionary.home.products}</Link>
          <Link href="/cart">{dictionary.home.cart}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
