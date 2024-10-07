import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ContributionBadgeDefaultAdapter } from "../adapters/default/default.adapter";
import { ContributionBadgePort } from "../contribution-badge.types";

export function ContributionBadge<C extends ElementType = "div">(props: ContributionBadgePort<C>) {
  return withComponentAdapter<ContributionBadgePort<C>>(ContributionBadgeDefaultAdapter)(props);
}
