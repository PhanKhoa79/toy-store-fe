import { httpClient, unwrapApiData } from '@/lib/api/http-client';
import type { ApiSuccess } from '@/types/contracts';

export type UploadResultDto = {
  url: string;
  key: string;
};

export const adminUploadsService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await httpClient.post<ApiSuccess<UploadResultDto>>('/admin/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return unwrapApiData(response.data);
  }
};
