import { OrderDetailPage } from '@/modules/customer-account/pages/OrderDetailPage';

type PageProps = {
  params: Promise<{ orderCode: string }>;
};

export default async function Page({ params }: PageProps) {
  const { orderCode } = await params;
  return <OrderDetailPage orderCode={orderCode} />;
}
