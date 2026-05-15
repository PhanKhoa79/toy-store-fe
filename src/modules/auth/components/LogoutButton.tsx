'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useLogoutMutation } from '@/modules/auth/hooks/useLogoutMutation';

type LogoutButtonProps = {
  label: string;
};

export function LogoutButton({ label }: LogoutButtonProps) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled: () => router.replace('/login')
    });
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleLogout} disabled={logoutMutation.isPending}>
      {label}
    </Button>
  );
}
