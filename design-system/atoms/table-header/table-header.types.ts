import { HeaderGroup as ReactTableHeaderGroup } from "@tanstack/react-table";

interface Variants {}

interface ClassNames {
  base: string;
  row: string;
  header: string;
}

interface HeaderGroup extends ReactTableHeaderGroup<unknown> {
  // Includes the following
  // id: string;
  // headers: {
  //   id: string;
  //   isPlaceholder?: boolean;
  // }[];
}

export interface TableHeaderPort extends Partial<Variants> {
  headerGroups: HeaderGroup[];
  classNames?: Partial<ClassNames>;
}
