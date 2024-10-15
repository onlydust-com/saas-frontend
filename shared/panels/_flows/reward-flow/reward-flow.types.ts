import { PropsWithChildren } from "react";

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
    contributionIds: string[];
    amount?: SelectedRewardsBudget;
  }
>;

export interface startFlowProps {
  githubUserIds: number[];
  issueIds: string[];
  contributionIds?: string[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  selectedGithubUserIds: number[];
  selectedIssueIds: string[];
  addContributionIds: (contributionId: string[], githubUserId: number) => void;
  removeContributionId: (contributionId: string, githubUserId: number) => void;
  getSelectedContributionIds: (githubUserId: number) => string[];
  updateAmount: (githubUserId: number, amount: SelectedRewardsBudget) => void;
  getAmount: (githubUserId: number) => SelectedRewardsBudget;
}
