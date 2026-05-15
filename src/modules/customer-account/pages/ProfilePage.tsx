'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useCustomerProfileQuery, useUpdateCustomerProfile } from '@/modules/customer-account/hooks/useCustomerAccountQueries';

type ProfileFormValues = {
  fullName: string;
  phone: string;
};

export function ProfilePage() {
  const { data: profile, isLoading } = useCustomerProfileQuery();
  const updateProfile = useUpdateCustomerProfile();
  const form = useForm<ProfileFormValues>();

  useEffect(() => {
    if (profile) {
      form.reset({ fullName: profile.fullName, phone: profile.phone ?? '' });
    }
  }, [profile, form]);

  function onSubmit(values: ProfileFormValues) {
    updateProfile.mutate(
      { fullName: values.fullName, phone: values.phone || undefined },
      {
        onSuccess: () => toast.success('Cập nhật hồ sơ thành công'),
        onError: (error) => toast.error('Lỗi', { description: getApiErrorMessage(error) })
      }
    );
  }

  if (isLoading) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">Đang tải...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hồ sơ</CardTitle>
        <p className="text-sm text-slate-500">Email: {profile?.email}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <Label>Họ và tên</Label>
            <Input {...form.register('fullName')} className="mt-1" />
          </label>
          <label className="block">
            <Label>Số điện thoại</Label>
            <Input {...form.register('phone')} className="mt-1" />
          </label>
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
