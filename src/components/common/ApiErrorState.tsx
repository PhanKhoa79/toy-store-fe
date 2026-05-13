'use client';

import { getApiErrorMessage } from '@/lib/api/http-client';
import { useI18n } from '@/i18n';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { RetryButton } from './RetryButton';

type ApiErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
};

export function ApiErrorState({ error, onRetry }: ApiErrorStateProps) {
  const { dictionary } = useI18n();

  return (
    <Alert variant="destructive">
      <AlertTitle>{dictionary.common.errorTitle}</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>{getApiErrorMessage(error)}</p>
        {onRetry ? <RetryButton onRetry={onRetry} label={dictionary.common.retry} /> : null}
      </AlertDescription>
    </Alert>
  );
}
