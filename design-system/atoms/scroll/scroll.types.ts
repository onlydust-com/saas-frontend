import { PropsWithChildren } from "react";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface ScrollPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  className?: string;
  direction?: "x" | "y";
}
