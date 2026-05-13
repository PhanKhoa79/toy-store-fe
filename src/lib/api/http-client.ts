import axios, { AxiosError } from 'axios';
import { env } from '@/lib/env';
import type { ApiFailure } from '@/contracts/api';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
