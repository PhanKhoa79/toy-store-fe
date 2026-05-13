'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email khong hop le'),
  password: z.string().min(8, 'Mat khau toi thieu 8 ky tu')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: LoginFormValues) {
    console.info('TODO auth login', values.email);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Toyshop</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Dang nhap</h1>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            {...form.register('email')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="customer@example.com"
          />
          <span className="text-sm text-red-600">{form.formState.errors.email?.message}</span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Mat khau</span>
          <input
            {...form.register('password')}
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="********"
          />
          <span className="text-sm text-red-600">{form.formState.errors.password?.message}</span>
        </label>
      </div>
      <button type="submit" className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 font-bold text-white hover:bg-brand-600">
        Dang nhap
      </button>
    </form>
  );
}
