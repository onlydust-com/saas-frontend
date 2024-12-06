import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardProjectMarketplaceDefaultAdapter } from "../adapters/default/default.adapter";
import { CardProjectMarketplacePort } from "../card-project-marketplace.types";

export function CardProjectMarketplace<C extends ElementType = "div">(props: CardProjectMarketplacePort<C>) {
  return withComponentAdapter<CardProjectMarketplacePort<C>>(CardProjectMarketplaceDefaultAdapter)(props);
}
