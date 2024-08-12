import { PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TableSortPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  direction: SortDirection;
  onDirectionChange: (direction: SortDirection) => void;
}
