'use client';

import { FallbackCard } from '@/components/common';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="vi">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
          <FallbackCard title="Application error" description={error.message || 'An unexpected error occurred.'} onRetry={reset} retryLabel="Try again" />
        </main>
      </body>
    </html>
  );
}
