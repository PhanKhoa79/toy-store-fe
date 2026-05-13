'use client';

import { FallbackCard } from '@/components/common';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <FallbackCard title="Page error" description={error.message || 'This page failed to render.'} onRetry={reset} retryLabel="Try again" />
    </main>
  );
}
