'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useI18n } from '@/i18n';
import { createLoginSchema, type LoginFormValues } from '@/modules/auth/schemas/login.schema';

export function LoginForm() {
  const { dictionary } = useI18n();
  const loginSchema = useMemo(() => createLoginSchema(dictionary.auth), [dictionary]);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  function onSubmit(values: LoginFormValues) {
    console.info('TODO auth login', values.email);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Toyshop</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">{dictionary.auth.loginTitle}</h1>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{dictionary.auth.email}</span>
          <input {...form.register('email')} className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500" placeholder="customer@example.com" />
          <span className="text-sm text-red-600">{form.formState.errors.email?.message}</span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{dictionary.auth.password}</span>
          <input {...form.register('password')} type="password" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500" placeholder="********" />
          <span className="text-sm text-red-600">{form.formState.errors.password?.message}</span>
        </label>
      </div>
      <button type="submit" className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 font-bold text-white hover:bg-brand-600">
        {dictionary.auth.submitLogin}
      </button>
    </form>
  );
}
