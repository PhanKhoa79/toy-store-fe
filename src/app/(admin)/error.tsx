'use client';

import { FallbackCard } from '@/components/common';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <FallbackCard title="Admin page error" description={error.message || 'Please try again.'} onRetry={reset} retryLabel="Retry" />
    </main>
  );
}
