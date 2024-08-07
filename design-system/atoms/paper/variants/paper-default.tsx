import { ElementType } from "react";

import { PaperDefaultAdapter } from "@/design-system/atoms/paper/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { PaperPort } from "../paper.types";

export function Paper<C extends ElementType = "article">(props: PaperPort<C>) {
  return withComponentAdapter<PaperPort<C>>(PaperDefaultAdapter)(props);
}
