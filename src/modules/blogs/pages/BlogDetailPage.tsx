'use client';

import Link from 'next/link';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { usePublicBlogDetailQuery } from '@/modules/blogs/hooks/useBlogsQuery';

type BlogDetailPageProps = {
  slug: string;
};

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const { data: blog, isLoading, error, refetch } = usePublicBlogDetailQuery(slug);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-4 h-96 rounded-3xl" />
      </main>
    );
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;
  if (!blog) return <EmptyState />;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/blogs" className="text-sm font-semibold text-brand-600 hover:underline">← Bài viết</Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-950">{blog.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{blog.author?.fullName ? `Tác giả: ${blog.author.fullName}` : ''}</p>
      <article className="mt-8 whitespace-pre-line text-slate-700">{blog.content ?? blog.excerpt}</article>
    </main>
  );
}
