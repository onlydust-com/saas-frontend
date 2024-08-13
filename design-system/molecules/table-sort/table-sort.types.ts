interface Variants {}

interface ClassNames {
  base: string;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TableSortPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  direction: SortDirection;
  onDirectionChange: (direction: SortDirection) => void;
}
