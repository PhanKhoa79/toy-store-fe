export type TablePaginationState = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type TableSortState<TSortKey extends string = string> = {
  sortBy?: TSortKey;
  sortDirection?: 'asc' | 'desc';
};
