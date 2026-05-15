'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/modules/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Sản phẩm' },
  { href: '/admin/categories', label: 'Danh mục' },
  { href: '/admin/brands', label: 'Thương hiệu' },
  { href: '/admin/orders', label: 'Đơn hàng' },
  { href: '/admin/customers', label: 'Khách hàng' },
  { href: '/admin/reviews', label: 'Đánh giá' },
  { href: '/admin/blogs', label: 'Bài viết' },
  { href: '/admin/homepage-slides', label: 'Slides' },
  { href: '/admin/users', label: 'Nhân viên' },
  { href: '/admin/chat', label: 'Chat' }
];

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="w-full border-r border-slate-200 bg-white lg:w-64">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-lg font-black text-slate-950">
            Toyshop Admin
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${pathname === item.href ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-4 lg:mt-auto">
            <LogoutButton label="Đăng xuất" />
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 px-6 py-8">{children}</main>
    </div>
  );
}
