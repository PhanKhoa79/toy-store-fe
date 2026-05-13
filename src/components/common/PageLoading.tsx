import { Skeleton } from '@/components/ui';

export function PageLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96 max-w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-3xl" />
        ))}
      </div>
    </main>
  );
}
