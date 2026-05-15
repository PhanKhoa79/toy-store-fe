import { ChatWidget } from '@/modules/live-chat/components/ChatWidget';
import { PublicHeader } from '@/modules/public-layout';

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicHeader />
      {children}
      <ChatWidget />
    </>
  );
}
