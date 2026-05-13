import { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { ApiFailure, ErrorCode } from '@/types/contracts';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiFailure | undefined;
    return data?.error?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Da co loi xay ra';
}

export function getApiErrorCode(error: unknown): ErrorCode | undefined {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiFailure | undefined;
    return data?.error?.code;
  }

  return undefined;
}

export function showApiErrorToast(error: unknown, fallbackTitle = 'Request failed') {
  toast.error(fallbackTitle, {
    description: getApiErrorMessage(error)
  });
}
