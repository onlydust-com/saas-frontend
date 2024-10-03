import { ComponentPropsWithoutRef, ElementType } from "react";

import { Contribution } from "@/core/domain/contribution/contribution-contract.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardContributionKanbanPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  contribution: Contribution;
}
