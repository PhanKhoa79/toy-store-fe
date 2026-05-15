import { BlogDetailPage } from '@/modules/blogs/pages/BlogDetailPage';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
