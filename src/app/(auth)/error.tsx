'use client';

import { FallbackCard } from '@/components/common';

export default function AuthError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <FallbackCard title="Authentication error" description={error.message || 'Please try again.'} onRetry={reset} retryLabel="Retry" />
    </main>
  );
}
