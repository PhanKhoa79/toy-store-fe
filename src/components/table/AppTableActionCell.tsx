import type { TableAction } from './types/table-action.type';

type AppTableActionCellProps<TRow> = {
  row: TRow;
  actions: TableAction<TRow>[];
};

export function AppTableActionCell<TRow>({ row, actions }: AppTableActionCellProps<TRow>) {
  const visibleActions = actions.filter((action) => !action.hidden?.(row));

  return (
    <div className="flex flex-wrap gap-2">
      {visibleActions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={action.disabled?.(row)}
          onClick={() => action.onClick(row)}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
