import { Row as ReactTableRow } from "@tanstack/react-table";

interface Variants {}

interface ClassNames {
  base: string;
  cell: string;
}

export interface Row<R> extends ReactTableRow<R> {
  // Includes the following
  // id: string;
}

export interface TableRowPort<R> extends Partial<Variants> {
  row: Row<R>;
  classNames?: Partial<ClassNames>;
  onRowClick?: (row: Row<R>) => void;
}
