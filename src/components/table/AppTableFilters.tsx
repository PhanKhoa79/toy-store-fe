import type { TableFilterDef } from './types/table-filter.type';

type AppTableFiltersProps = {
  filters: TableFilterDef[];
};

export function AppTableFilters({ filters }: AppTableFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <div key={filter.key} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          {filter.label}
        </div>
      ))}
    </div>
  );
}
