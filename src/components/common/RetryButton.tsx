'use client';

import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';

type RetryButtonProps = {
  onRetry: () => void;
  label?: string;
};

export function RetryButton({ onRetry, label = 'Retry' }: RetryButtonProps) {
  return (
    <Button type="button" onClick={onRetry} variant="outline">
      <RotateCcw className="h-4 w-4" />
      {label}
    </Button>
  );
}
