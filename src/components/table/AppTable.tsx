import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';

export type AppTableColumn<TRow> = {
  key: string;
  header: string;
  cell: (row: TRow) => React.ReactNode;
};

type AppTableProps<TRow> = {
  rows: TRow[];
  columns: AppTableColumn<TRow>[];
  isLoading?: boolean;
  getRowKey: (row: TRow) => string;
};

export function AppTable<TRow>({ rows, columns, isLoading, getRowKey }: AppTableProps<TRow>) {
  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (rows.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3">
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
