export type TableFilterOption = {
  label: string;
  value: string;
};

export type SearchFilterDef = {
  type: 'search';
  key: string;
  label: string;
  placeholder?: string;
  debounceMs?: number;
};

export type SelectFilterDef = {
  type: 'select';
  key: string;
  label: string;
  options: TableFilterOption[];
};

export type TableFilterDef = SearchFilterDef | SelectFilterDef;
