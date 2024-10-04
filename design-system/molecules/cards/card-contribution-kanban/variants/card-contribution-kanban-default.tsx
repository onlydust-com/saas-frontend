import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { CardContributionKanbanNextUiAdapter } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.adapter";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";

export function CardContributionKanban<C extends ElementType = "div">(props: CardContributionKanbanPort<C>) {
  return withComponentAdapter<CardContributionKanbanPort<C>>(CardContributionKanbanNextUiAdapter)(props);
}
