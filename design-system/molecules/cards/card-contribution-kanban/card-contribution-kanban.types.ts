import { ElementType } from "react";

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { PaperPort } from "@/design-system/atoms/paper";

interface Variants {}

interface ClassNames {
  base: string;
}

interface User {
  login: string;
  avatarUrl: string;
}

export interface CardContributionKanbanPort<C extends ElementType> extends Partial<Variants>, Partial<PaperPort<C>> {
  classNames?: Partial<ClassNames>;
  type: ContributionTypeUnion;
  githubTitle: string;
  githubStatus: ContributionGithubStatusUnion;
  githubNumber: string | number;
  lastUpdatedAt?: string;
  rewardUsdAmount?: number;
  applicants?: User[];
  contributors?: User[];
  linkedIssues?: {
    type: ContributionTypeUnion;
    githubTitle: string;
    githubStatus: ContributionGithubStatusUnion;
    githubNumber: string | number;
  }[];
  githubLabels?: {
    name: string;
  }[];
  onClick?(): void;
  actions?: ButtonGroupPort["buttons"];
  showActions?: boolean;
}
