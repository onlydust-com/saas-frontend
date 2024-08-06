import { ElementType } from "react";

import { TypoDefaultAdapter } from "@/design-system/atoms/typo/adapters/default/default.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TypoPort } from "../typo.types";

export function Typo<C extends ElementType = "span">(props: TypoPort<C>) {
  return withComponentAdapter<TypoPort<C>>(TypoDefaultAdapter)(props);
}
