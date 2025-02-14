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
    avatarUrl?: string;
    login: string;
  }
>;

export interface StartFlowProps {
  githubUserIds: number[];
  contributions?: ContributionItemDtoInterface[];
  avatarUrls?: Array<string | undefined>;
  logins?: string[];
}

export interface AddContributorIdArgs {
  contributorId: number;
  avatarUrl?: string;
  login?: string;
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: StartFlowProps) => void;
  addOtherWorks: (otherWorks: RewardableItemInterface[], githubUserId: number) => void;
  addContributions: (contributions: ContributionItemDtoInterface[], githubUserId: number) => void;
  removeContribution: (contribution: ContributionItemDtoInterface, githubUserId: number) => void;
  getOtherWorks: (githubUserId: number) => RewardableItemInterface[];
  getSelectedContributions: (githubUserId: number) => ContributionItemDto[];
  updateAmount: (githubUserId: number, amount: SelectedRewardsBudget) => void;
  getAmount: (githubUserId: number) => SelectedRewardsBudget;
  removeAmount: (githubUserId: number) => void;
  amountPerCurrency: Record<string, SelectedRewardsBudget>;
  onCreateRewards: () => void;
  isCreatingRewards: boolean;
  addContributorId: (args: AddContributorIdArgs) => void;
  removeContributorId: (contributorId: number) => void;
  selectedGithubUserIds: number[];
  removeAllContributions: (githubUserId: number) => void;
  getAvatarUrl: (githubUserId: number) => string;
  getLogin: (githubUserId: number) => string;
}
