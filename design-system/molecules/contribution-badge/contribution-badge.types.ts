import { ElementType } from "react";

import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { BadgeIconPort } from "@/design-system/atoms/badge";

export type Contribution = Pick<
  components["schemas"]["ContributionPageItemResponse"],
  "type" | "githubStatus" | "githubNumber"
>;

export interface ContributionBadgePort<C extends ElementType> extends BadgeIconPort<C> {
  contribution: Contribution;
}
