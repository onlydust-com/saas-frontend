import { ElementType, ReactNode } from "react";

import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { PaperPort } from "@/design-system/atoms/paper";
import { ApplicantsProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/applicants/applicants.types";
import { ContributorsProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/contributors/contributors.types";
import { GithubLabelsProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/github-labels/github-labels.types";
import { LinkedIssuesProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/linked-issues/linked-issues.types";
import { ProjectProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/project/project.types";
import { RewardUsdAmountProps } from "@/design-system/molecules/cards/card-contribution-kanban/_components/reward-usd-amount/reward-usd-amount.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface CardContributionKanbanPort<C extends ElementType> extends Partial<Variants>, Partial<PaperPort<C>> {
  classNames?: Partial<ClassNames>;
  type: ContributionTypeUnion;
  githubTitle: string;
  githubStatus: ContributionGithubStatusUnion;
  githubNumber: string | number;
  lastUpdatedAt?: string;
  rewardUsdAmount: RewardUsdAmountProps["rewardUsdAmount"];
  applicants: ApplicantsProps["applicants"];
  contributors: ContributorsProps["contributors"];
  project: ProjectProps["project"];
  linkedIssues: LinkedIssuesProps["linkedIssues"];
  githubLabels: GithubLabelsProps["githubLabels"];
  onClick?(): void;
  actions?: ButtonGroupPort["buttons"];
  endContent?: ReactNode;
  showActions?: boolean;
}
