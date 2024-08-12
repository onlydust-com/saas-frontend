import { PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

type State = "positive" | "negative";

export interface TableKpiPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  state?: State;
}
