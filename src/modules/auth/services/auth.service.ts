import { httpClient } from '@/lib/api/http-client';
import { unwrapApiData } from '@/lib/api/response-normalizer';
import type { ApiSuccess, AuthMeResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/contracts';

export const authService = {
  login: async (payload: LoginRequest) => {
    const response = await httpClient.post<ApiSuccess<LoginResponse>>('/auth/login', payload);
    return unwrapApiData(response.data);
  },
  register: async (payload: RegisterRequest) => {
    const response = await httpClient.post<ApiSuccess<RegisterResponse>>('/auth/register', payload);
    return unwrapApiData(response.data);
  },
  logout: async () => {
    const response = await httpClient.post<ApiSuccess<{ loggedOut: boolean }>>('/auth/logout');
    return unwrapApiData(response.data);
  },
  me: async () => {
    const response = await httpClient.get<ApiSuccess<AuthMeResponse>>('/auth/me');
    return unwrapApiData(response.data);
  },
  refresh: async () => {
    const response = await httpClient.post<ApiSuccess<{ refreshed: boolean }>>('/auth/refresh');
    return unwrapApiData(response.data);
  }
};
