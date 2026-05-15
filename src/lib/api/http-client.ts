import axios from 'axios';
import { env } from '@/lib/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { getApiErrorCode, getApiErrorMessage, showApiErrorToast } from './api-error';
export { unwrapApiData, unwrapPaginatedResponse } from './response-normalizer';
