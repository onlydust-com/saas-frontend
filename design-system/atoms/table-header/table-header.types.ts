import { useReactTable } from "@tanstack/react-table";

interface Variants {}

interface ClassNames {
  base: string;
  row: string;
  header: string;
}

interface HeaderGroups extends ReturnType<ReturnType<typeof useReactTable>["getHeaderGroups"]> {
  // Includes the following
  // id: string;
  // headers: {
  //   id: string;
  //   isPlaceholder?: boolean;
  // }[];
}

export interface TableHeaderPort extends Partial<Variants> {
  headerGroups: HeaderGroups;
  classNames?: Partial<ClassNames>;
}
