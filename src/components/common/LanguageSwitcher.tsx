'use client';

import { useI18n } from '@/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, dictionary } = useI18n();

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
      <span>{dictionary.common.language}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value === 'en' ? 'en' : 'vi')}
        className="bg-transparent text-sm font-semibold outline-none"
      >
        <option value="vi">{dictionary.common.vietnamese}</option>
        <option value="en">{dictionary.common.english}</option>
      </select>
    </label>
  );
}
