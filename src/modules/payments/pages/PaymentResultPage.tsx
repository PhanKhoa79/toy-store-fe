'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ApiErrorState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { usePaymentResultQuery } from '@/modules/payments/hooks/usePaymentResultQuery';

export function PaymentResultPage() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  const { data: result, isLoading, error, refetch } = usePaymentResultQuery(params);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-6 py-10">
        <Skeleton className="h-64 rounded-3xl" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-6 py-10">
        <ApiErrorState error={error} onRetry={() => void refetch()} />
      </main>
    );
  }

  const success = result?.success ?? false;

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>{success ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</CardTitle>
          <p className="mt-2 text-slate-600">
            Mã đơn hàng: {result?.orderCode ?? '-'}
          </p>
          <p className="text-slate-600">Trạng thái: {result?.paymentStatus ?? '-'}</p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/account/orders">Xem đơn hàng</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
