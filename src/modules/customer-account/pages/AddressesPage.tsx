'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ApiErrorState, EmptyState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Button, Card, CardContent, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCustomerAddressesQuery, useCreateAddress, useDeleteAddress, useSetDefaultAddress } from '@/modules/customer-account/hooks/useCustomerAccountQueries';
import type { AddressFormRequest } from '@/types/contracts';

export function AddressesPage() {
  const { data: addresses, isLoading, error, refetch } = useCustomerAddressesQuery();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefault = useSetDefaultAddress();
  const [open, setOpen] = useState(false);
  const form = useForm<AddressFormRequest>();

  function onSubmit(values: AddressFormRequest) {
    createAddress.mutate(values, {
      onSuccess: () => {
        toast.success('Thêm địa chỉ thành công');
        setOpen(false);
        form.reset();
      },
      onError: (err) => toast.error('Lỗi', { description: getApiErrorMessage(err) })
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  if (error) return <ApiErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Địa chỉ</h1>
        <Button size="sm" onClick={() => setOpen(true)}>Thêm địa chỉ</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <label className="block">
              <Label>Người nhận</Label>
              <Input {...form.register('recipientName')} className="mt-1" />
            </label>
            <label className="block">
              <Label>Số điện thoại</Label>
              <Input {...form.register('recipientPhone')} className="mt-1" />
            </label>
            <label className="block">
              <Label>Địa chỉ</Label>
              <Input {...form.register('addressLine')} className="mt-1" />
            </label>
            <label className="block">
              <Label>Ghi chú</Label>
              <Input {...form.register('note')} className="mt-1" />
            </label>
            <Button type="submit" className="w-full" disabled={createAddress.isPending}>Lưu</Button>
          </form>
        </DialogContent>
      </Dialog>

      {(!addresses || addresses.length === 0) && <EmptyState />}

      <div className="space-y-3">
        {(addresses ?? []).map((addr) => (
          <Card key={addr.id}>
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{addr.recipientName} · {addr.recipientPhone}</span>
                {addr.isDefault && <span className="text-xs font-semibold text-brand-600">Mặc định</span>}
              </div>
              <p className="text-sm text-slate-600">{addr.addressLine}</p>
              <div className="flex gap-2">
                {!addr.isDefault && (
                  <Button size="sm" variant="outline" onClick={() => setDefault.mutate(addr.id)} disabled={setDefault.isPending}>
                    Đặt mặc định
                  </Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => deleteAddress.mutate(addr.id)} disabled={deleteAddress.isPending}>
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
