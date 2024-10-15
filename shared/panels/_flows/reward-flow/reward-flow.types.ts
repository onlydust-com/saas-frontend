import { PropsWithChildren } from "react";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export type SelectedRewardsState = Record<
  number,
  {
    contributionIds: string[];
    amount?: {
      amount: string;
      currencyId: string;
    };
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
  updateAmount: (githubUserId: number, amount: { amount: string; currencyId: string }) => void;
  getAmount: (githubUserId: number) => { amount: string; currencyId: string };
}
