import { PropsWithChildren } from "react";

import {
  ContributionItemDto,
  ContributionItemDtoInterface,
} from "@/core/domain/contribution/dto/contribution-item-dto";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export type SelectedRewardsBudget = {
  amount: string;
  budget?: DetailedTotalMoneyTotalPerCurrency;
};

export type RewardsState = Record<
  number,
  {
    contributions: ContributionItemDtoInterface[];
    amount?: SelectedRewardsBudget;
    otherWorks?: ContributionActivityInterface[];
  }
>;

export interface startFlowProps {
  githubUserIds: number[];
  contributions?: ContributionItemDtoInterface[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  addOtherWorks: (otherWorks: ContributionActivityInterface[], githubUserId: number) => void;
  addContributions: (contributions: ContributionItemDtoInterface[], githubUserId: number) => void;
  removeContribution: (contribution: ContributionItemDtoInterface, githubUserId: number) => void;
  getOtherWorks: (githubUserId: number) => ContributionActivityInterface[];
  getSelectedContributions: (githubUserId: number) => ContributionItemDto[];
  updateAmount: (githubUserId: number, amount: SelectedRewardsBudget) => void;
  getAmount: (githubUserId: number) => SelectedRewardsBudget;
  removeAmount: (githubUserId: number) => void;
  amountPerCurrency: Record<string, SelectedRewardsBudget>;
  onCreateRewards: () => void;
  isCreatingRewards: boolean;
  addContributorId: (contributorId: number) => void;
  removeContributorId: (contributorId: number) => void;
  selectedGithubUserIds: number[];
}
