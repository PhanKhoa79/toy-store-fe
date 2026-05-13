import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

export function UnauthorizedState() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <Card className="max-w-lg">
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>You do not have permission to access this page.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
