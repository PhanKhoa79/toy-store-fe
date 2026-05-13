'use client';

import { useI18n } from '@/i18n';

export function CartPage() {
  const { dictionary } = useI18n();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">{dictionary.cart.title}</h1>
      <p className="mt-3 text-slate-600">{dictionary.cart.description}</p>
    </main>
  );
}
