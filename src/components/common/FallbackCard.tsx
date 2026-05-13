'use client';

import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { RetryButton } from './RetryButton';

type FallbackCardProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function FallbackCard({ title, description, onRetry, retryLabel }: FallbackCardProps) {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      {onRetry ? (
        <CardContent>
          <RetryButton onRetry={onRetry} label={retryLabel} />
        </CardContent>
      ) : null}
    </Card>
  );
}
