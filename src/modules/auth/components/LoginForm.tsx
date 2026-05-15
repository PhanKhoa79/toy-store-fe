'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { useI18n } from '@/i18n';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useLoginMutation } from '@/modules/auth/hooks/useLoginMutation';
import { createLoginSchema, type LoginFormValues } from '@/modules/auth/schemas/login.schema';
import { getDefaultAuthenticatedPath } from '@/modules/auth/utils/auth-redirect.util';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dictionary } = useI18n();
  const loginMutation = useLoginMutation();
  const loginSchema = useMemo(() => createLoginSchema(dictionary.auth), [dictionary]);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onSuccess: (session) => {
        const next = searchParams.get('next') ?? getDefaultAuthenticatedPath(session.user);
        router.replace(next);
      },
      onError: (error) => {
        toast.error(dictionary.auth.loginFailed, { description: getApiErrorMessage(error) });
      }
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Toyshop</p>
        <CardTitle>{dictionary.auth.loginTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <Label htmlFor="email">{dictionary.auth.email}</Label>
            <Input id="email" {...form.register('email')} className="mt-1" placeholder="customer@toyshop.local" />
            <span className="text-sm text-red-600">{form.formState.errors.email?.message}</span>
          </label>
          <label className="block">
            <Label htmlFor="password">{dictionary.auth.password}</Label>
            <Input id="password" {...form.register('password')} type="password" className="mt-1" placeholder="Password123!" />
            <span className="text-sm text-red-600">{form.formState.errors.password?.message}</span>
          </label>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? dictionary.common.loading : dictionary.auth.submitLogin}
          </Button>
          <p className="text-center text-sm text-slate-600">
            {dictionary.auth.noAccount}{' '}
            <Link href="/register" className="font-semibold text-brand-600 hover:underline">
              {dictionary.auth.submitRegister}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
