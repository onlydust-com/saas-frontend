import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardBudgetDefaultAdapter } from "../adapters/default/default.adapter";
import { CardBudgetPort } from "../card-budget.types";

export function CardBudget<C extends ElementType = "div">(props: CardBudgetPort<C>) {
  return withComponentAdapter<CardBudgetPort<C>>(CardBudgetDefaultAdapter)(props);
}
