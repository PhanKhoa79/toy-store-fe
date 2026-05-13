import { PublicHeader } from '@/modules/public-layout';

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
