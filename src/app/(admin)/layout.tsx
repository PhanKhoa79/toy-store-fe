import { AdminGuard } from '@/modules/auth';
import { AdminLayoutShell } from '@/modules/admin/components/AdminLayoutShell';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AdminGuard>
  );
}
