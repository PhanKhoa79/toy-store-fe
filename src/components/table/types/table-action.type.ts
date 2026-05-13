export type TableAction<TRow> = {
  label: string;
  onClick: (row: TRow) => void;
  hidden?: (row: TRow) => boolean;
  disabled?: (row: TRow) => boolean;
};
