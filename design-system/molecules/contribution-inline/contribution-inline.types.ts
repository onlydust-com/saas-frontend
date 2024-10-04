import { ComponentPropsWithoutRef, ElementType } from "react";

import { Contribution } from "@/core/domain/contribution/contribution-contract.types";

interface Variants {
  truncate: boolean;
}

interface ClassNames {
  base: string;
  label: string;
}

export interface ContributionInlinePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  contribution: Contribution;
  truncate?: boolean;
}
