import { Table } from "@tanstack/react-table";

import { TableHeaderPort } from "@/design-system/atoms/table-header";
import { Row } from "@/design-system/atoms/table-row";

import { EmptyStateLiteProps } from "@/shared/components/empty-state-lite/empty-state-lite.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableBodyProps<R> {
  rows: Row<R>[];
  onRowClick?: (row: Row<R>) => void;
  emptyState?: EmptyStateLiteProps;
  headersLength: number;
}

export interface TablePort<H, R> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  table: Table<H>;
  header: TableHeaderPort<H>;
  rows: Row<R>[];
  onRowClick?: (row: Row<R>) => void;
  emptyState?: EmptyStateLiteProps;
}
