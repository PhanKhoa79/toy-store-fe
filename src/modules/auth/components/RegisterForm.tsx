'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useI18n } from '@/i18n';
import { useRegisterMutation } from '@/modules/auth/hooks/useRegisterMutation';
import { createRegisterSchema, type RegisterFormValues } from '@/modules/auth/schemas/register.schema';
import { getDefaultAuthenticatedPath } from '@/modules/auth/utils/auth-redirect.util';

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dictionary } = useI18n();
  const registerMutation = useRegisterMutation();
  const registerSchema = useMemo(() => createRegisterSchema(dictionary.auth), [dictionary]);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' }
  });

  function onSubmit(values: RegisterFormValues) {
    registerMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        password: values.password
      },
      {
        onSuccess: (session) => {
          const next = searchParams.get('next') ?? getDefaultAuthenticatedPath(session.user);
          router.replace(next);
        },
        onError: (error) => {
          toast.error(dictionary.auth.registerFailed, { description: getApiErrorMessage(error) });
        }
      }
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Toyshop</p>
        <CardTitle>{dictionary.auth.registerTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <Label htmlFor="fullName">{dictionary.auth.fullName}</Label>
            <Input id="fullName" {...form.register('fullName')} className="mt-1" />
            <span className="text-sm text-red-600">{form.formState.errors.fullName?.message}</span>
          </label>
          <label className="block">
            <Label htmlFor="email">{dictionary.auth.email}</Label>
            <Input id="email" {...form.register('email')} className="mt-1" />
            <span className="text-sm text-red-600">{form.formState.errors.email?.message}</span>
          </label>
          <label className="block">
            <Label htmlFor="phone">{dictionary.auth.phone}</Label>
            <Input id="phone" {...form.register('phone')} className="mt-1" />
          </label>
          <label className="block">
            <Label htmlFor="password">{dictionary.auth.password}</Label>
            <Input id="password" {...form.register('password')} type="password" className="mt-1" />
            <span className="text-sm text-red-600">{form.formState.errors.password?.message}</span>
          </label>
          <label className="block">
            <Label htmlFor="confirmPassword">{dictionary.auth.confirmPassword}</Label>
            <Input id="confirmPassword" {...form.register('confirmPassword')} type="password" className="mt-1" />
            <span className="text-sm text-red-600">{form.formState.errors.confirmPassword?.message}</span>
          </label>
          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? dictionary.common.loading : dictionary.auth.submitRegister}
          </Button>
          <p className="text-center text-sm text-slate-600">
            {dictionary.auth.hasAccount}{' '}
            <Link href="/login" className="font-semibold text-brand-600 hover:underline">
              {dictionary.auth.submitLogin}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
