import { ElementType, ReactNode } from "react";

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";

import { BadgeIconPort } from "@/design-system/atoms/badge";

export interface ContributionBadgePort<C extends ElementType> extends Partial<BadgeIconPort<C>> {
  type: ContributionTypeUnion;
  githubStatus: ContributionGithubStatusUnion;
  number: ReactNode;
}
