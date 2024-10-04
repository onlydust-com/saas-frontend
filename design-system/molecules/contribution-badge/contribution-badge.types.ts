import { ElementType, ReactNode } from "react";

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { BadgeIconPort } from "@/design-system/atoms/badge";

export type Contribution = Pick<
  components["schemas"]["ContributionPageItemResponse"],
  "type" | "githubStatus" | "githubNumber"
>;

export interface ContributionBadgePort<C extends ElementType> extends Partial<BadgeIconPort<C>> {
  type: ContributionTypeUnion;
  githubStatus: ContributionGithubStatusUnion;
  id: ReactNode;
}
