import type { TablePaginationState } from './types/table-query.type';

type AppTablePaginationProps = {
  pagination: TablePaginationState;
  onPageChange: (page: number) => void;
};

export function AppTablePagination({ pagination, onPageChange }: AppTablePaginationProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
      <span>
        Page {pagination.page} / {Math.max(pagination.totalPages, 1)} · {pagination.total} items
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pagination.page <= 1}
          onClick={() => onPageChange(pagination.page - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <button
          type="button"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
