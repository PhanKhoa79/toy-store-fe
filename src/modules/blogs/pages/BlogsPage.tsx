'use client';

import Link from 'next/link';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Card } from '@/components/ui';
import { usePublicBlogsQuery } from '@/modules/blogs/hooks/useBlogsQuery';

export function BlogsPage() {
  const { data: blogs, isLoading, error, refetch } = usePublicBlogsQuery();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Skeleton className="h-10 w-48" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
      </main>
    );
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  if (!blogs || blogs.length === 0) return <EmptyState />;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">Bài viết</h1>
      <div className="mt-6 space-y-4">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <Card className="p-6 hover:border-brand-500">
              <h2 className="text-xl font-bold text-slate-950">{blog.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{blog.excerpt ?? ''}</p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
