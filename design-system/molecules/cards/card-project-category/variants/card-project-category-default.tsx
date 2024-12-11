import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardProjectCategoryDefaultAdapter } from "../adapters/default/default.adapter";
import { CardProjectCategoryPort } from "../card-project-category.types";

export function CardProjectCategory<C extends ElementType = "div">(props: CardProjectCategoryPort<C>) {
  return withComponentAdapter<CardProjectCategoryPort<C>>(CardProjectCategoryDefaultAdapter)(props);
}
