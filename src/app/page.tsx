import Link from 'next/link';

const links = [
  { href: '/products', label: 'Xem san pham' },
  { href: '/cart', label: 'Gio hang' },
  { href: '/login', label: 'Dang nhap' },
  { href: '/admin', label: 'Admin' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffe2a8,transparent_36%),linear-gradient(135deg,#fffaf0,#eef7ff)] px-6 py-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur md:p-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Toyshop MVP</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Nen tang ecommerce do choi tre em
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            Base frontend da san sang de ket noi API, implement feature theo docs, va redesign UI bang Stitch o giai doan sau.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-900 shadow-sm hover:border-brand-500 hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
