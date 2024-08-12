import { PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

type State = "positive" | "negative" | "neutral";

export interface TableCellKpiPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  state?: State;
}
