'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ApiErrorState } from '@/components/common';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Skeleton } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { formatVnd } from '@/lib/utils';
import { useAdminOrderDetailQuery, useUpdateAdminOrderStatus } from '@/modules/admin/hooks/useAdminOrders';
import type { OrderStatus } from '@/types/contracts';

type Props = {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const allowedTransitions: Record<string, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipping', 'cancelled'],
  shipping: ['delivered', 'cancelled']
};

export function AdminOrderDetailDrawer({ orderId, open, onOpenChange }: Props) {
  const { data: order, isLoading, error, refetch } = useAdminOrderDetailQuery(orderId);
  const updateStatus = useUpdateAdminOrderStatus();
  const [cancelReason, setCancelReason] = useState('');

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="px-6 pb-6">
          <Skeleton className="h-64 rounded-3xl" />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="px-6 pb-6">
          <ApiErrorState error={error} onRetry={() => void refetch()} />
        </DialogContent>
      </Dialog>
    );
  }

  if (!order) return null;

  const transitions = allowedTransitions[order.orderStatus] ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-6 pb-6">
        <DialogHeader>
          <DialogTitle>Đơn hàng {order.orderCode}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p><strong>Người nhận:</strong> {order.recipientName} · {order.recipientPhone}</p>
          <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
          <p><strong>Trạng thái:</strong> {order.orderStatus}</p>
          <p><strong>Thanh toán:</strong> {order.paymentStatus}</p>
          <div className="rounded-xl border border-slate-200 p-4 space-y-2">
            {(order.items ?? []).map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.productName} x{item.quantity}</span>
                <span className="font-semibold">{formatVnd(item.lineTotal)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-lg font-black">
              <span>Tổng</span>
              <span className="text-brand-600">{formatVnd(order.totalAmount)}</span>
            </div>
          </div>

          {transitions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold">Cập nhật trạng thái:</p>
              <div className="flex flex-wrap gap-2">
                {transitions.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={status === 'cancelled' ? 'destructive' : 'outline'}
                    onClick={() => {
                      if (status === 'cancelled') {
                        const reason = window.prompt('Lý do hủy đơn:');
                        if (!reason) return;
                        updateStatus.mutate({ id: order.id, orderStatus: status, cancelledReason: reason }, {
                          onSuccess: () => toast.success('Đã cập nhật'),
                          onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
                        });
                      } else {
                        updateStatus.mutate({ id: order.id, orderStatus: status }, {
                          onSuccess: () => toast.success('Đã cập nhật'),
                          onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
                        });
                      }
                    }}
                    disabled={updateStatus.isPending}
                  >
                    {status === 'cancelled' ? 'Hủy đơn' : status}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
