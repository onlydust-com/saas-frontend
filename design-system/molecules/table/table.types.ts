import { TableHeaderPort } from "@/design-system/atoms/table-header";
import { Row } from "@/design-system/atoms/table-row";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TablePort<H> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  header: TableHeaderPort<H>;
  rows: Row[];
}
