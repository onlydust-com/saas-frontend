import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardProjectOverviewDefaultAdapter } from "../adapters/default/default.adapter";
import { CardProjectOverviewPort } from "../card-project-overview.types";

export function CardProjectOverview<C extends ElementType = "div">(props: CardProjectOverviewPort<C>) {
  return withComponentAdapter<CardProjectOverviewPort<C>>(CardProjectOverviewDefaultAdapter)(props);
}
