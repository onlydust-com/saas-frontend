import { ElementType } from "react";

import { CardContributionKanbanDefaultVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/default/default.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";

import { cn } from "@/shared/helpers/cn";

export function CardContributionKanbanDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanDefaultVariants();

  return <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />;
}
