import { PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableFilterPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  filterCount?: number;
  onClear: () => void;
}
