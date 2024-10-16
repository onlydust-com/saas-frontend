import { PropsWithChildren } from "react";

import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export type SelectedRewardsBudget = {
  amount: string;
  budget?: DetailedTotalMoneyTotalPerCurrency;
};

export type SelectedRewardsState = Record<
  number,
  {
    contributions: ContributionItemDto[];
    amount?: SelectedRewardsBudget;
  }
>;

export interface startFlowProps {
  githubUserIds: number[];
  contributions?: ContributionItemDto[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  selectedGithubUserIds: number[];
  addContributions: (contributions: ContributionItemDto[], githubUserId: number) => void;
  removeContribution: (contribution: ContributionItemDto, githubUserId: number) => void;
  getSelectedContributions: (githubUserId: number) => ContributionItemDto[];
  updateAmount: (githubUserId: number, amount: SelectedRewardsBudget) => void;
  getAmount: (githubUserId: number) => SelectedRewardsBudget;
}
