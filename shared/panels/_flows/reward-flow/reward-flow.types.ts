import { PropsWithChildren } from "react";

import {
  ContributionItemDto,
  ContributionItemDtoInterface,
} from "@/core/domain/contribution/dto/contribution-item-dto";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";
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
    otherWorks?: RewardableItemInterface[];
  }
>;

export interface startFlowProps {
  githubUserIds: number[];
  contributions?: ContributionItemDtoInterface[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  addOtherWorks: (otherWorks: RewardableItemInterface[], githubUserId: number) => void;
  addContributions: (contributions: ContributionItemDtoInterface[], githubUserId: number) => void;
  removeContribution: (contribution: ContributionItemDtoInterface, githubUserId: number) => void;
  getOtherWorks: (githubUserId: number) => RewardableItemInterface[];
  getSelectedContributions: (githubUserId: number) => ContributionItemDto[];
  updateAmount: (githubUserId: number, amount: SelectedRewardsBudget) => void;
  getAmount: (githubUserId: number) => SelectedRewardsBudget;
  onCreateRewards: () => void;
  isCreatingRewards: boolean;
  addContributorId: (contributorId: number) => void;
  removeContributorId: (contributorId: number) => void;
  selectedGithubUserIds: number[];
}
