'use client';

import { useRef, useState } from 'react';
import { adminUploadsService } from '@/modules/admin/services/admin-uploads.service';

type ImageUploadInputProps = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploadInput({ value, onChange, label = 'Ảnh' }: ImageUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await adminUploadsService.uploadImage(file);
      if (result?.url) onChange(result.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="preview" className="h-16 w-16 rounded-lg object-cover" />}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {uploading ? 'Đang upload...' : value ? 'Đổi ảnh' : 'Chọn ảnh'}
        </button>
      </div>
    </div>
  );
}
