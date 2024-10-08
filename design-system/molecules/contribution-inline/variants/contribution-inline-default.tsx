import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ContributionInlineDefaultAdapter } from "../adapters/default/default.adapter";
import { ContributionInlinePort } from "../contribution-inline.types";

export function ContributionInline<C extends ElementType = "div">(props: ContributionInlinePort<C>) {
  return withComponentAdapter<ContributionInlinePort<C>>(ContributionInlineDefaultAdapter)(props);
}
