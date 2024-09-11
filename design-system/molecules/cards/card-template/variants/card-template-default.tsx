import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardTemplateDefaultAdapter } from "../adapters/default/default.adapter";
import { CardTemplatePort } from "../card-template.types";

export function CardTemplate<C extends ElementType = "div">(props: CardTemplatePort<C>) {
  return withComponentAdapter<CardTemplatePort<C>>(CardTemplateDefaultAdapter)(props);
}
