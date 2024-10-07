import { ComponentPropsWithoutRef, ElementType } from "react";

import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardContributionKanbanPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  contribution: ContributionActivityInterface;
  actions?: ButtonGroupPort["buttons"];
}
