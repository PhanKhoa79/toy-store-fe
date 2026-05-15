import type { Metadata } from 'next';
import { BlogsPage } from '@/modules/blogs/pages/BlogsPage';

export const metadata: Metadata = {
  title: 'Bài viết - ToyStore',
  description: 'Kiến thức và tin tức về đồ chơi trẻ em.'
};

export default function Page() {
  return <BlogsPage />;
}
