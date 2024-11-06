import { HeaderGroup as ReactTableHeaderGroup } from "@tanstack/react-table";

interface Variants {}

interface ClassNames {
  base: string;
  row: string;
  header: string;
  headerInner: string;
}

interface HeaderGroup<H> extends ReactTableHeaderGroup<H> {
  // Includes the following
  // id: string;
  // headers: {
  //   id: string;
  //   isPlaceholder?: boolean;
  // }[];
}

export interface TableHeaderPort<H> extends Partial<Variants> {
  headerGroups: HeaderGroup<H>[];
  classNames?: Partial<ClassNames>;
}
