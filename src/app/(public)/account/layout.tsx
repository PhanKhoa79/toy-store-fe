import { CustomerGuard } from '@/modules/auth';

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <CustomerGuard>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-60">
          <nav className="flex gap-2 lg:flex-col">
            <a href="/account" className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Hồ sơ</a>
            <a href="/account/orders" className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Đơn hàng</a>
            <a href="/account/addresses" className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Địa chỉ</a>
            <a href="/account/wishlist" className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">Yêu thích</a>
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </main>
    </CustomerGuard>
  );
}
