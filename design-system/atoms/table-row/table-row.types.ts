import { Row as ReactTableRow } from "@tanstack/react-table";

interface Variants {}

interface ClassNames {
  base: string;
  cell: string;
}

export interface Row extends ReactTableRow<unknown> {
  // Includes the following
  // id: string;
}

export interface TableRowPort extends Partial<Variants> {
  row: Row;
  classNames?: Partial<ClassNames>;
  onRowClick?: (row: Row) => void;
}
