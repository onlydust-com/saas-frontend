import { InputPort } from "@/design-system/atoms/input";
import { TableColumnListPort } from "@/design-system/molecules/table-column-list";
import { TableFilterPort } from "@/design-system/molecules/table-filter";
import { TableGroupByPort } from "@/design-system/molecules/table-group-by";
import { TableSortPort } from "@/design-system/molecules/table-sort";

interface ClassNames {
  base: string;
}

export interface TableNavPort {
  classNames?: Partial<ClassNames>;
  filter?: TableFilterPort;
  sort?: TableSortPort;
  groupBy?: TableGroupByPort;
  search?: InputPort;
  columnList?: TableColumnListPort;
}
