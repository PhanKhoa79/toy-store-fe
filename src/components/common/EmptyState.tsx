'use client';

import { useI18n } from '@/i18n';

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  const { dictionary } = useI18n();

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
      <p className="font-semibold text-slate-900">{title ?? dictionary.common.emptyTitle}</p>
      {description ? <p className="mt-2 text-sm">{description}</p> : null}
    </div>
  );
}
