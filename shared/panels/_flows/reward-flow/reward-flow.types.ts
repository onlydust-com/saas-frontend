import { PropsWithChildren } from "react";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export type SelectedContributionIdsState = Record<number, string[]>;

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
  addContributionId: (contributionId: string, githubUserId: number) => void;
  addContributionsId: (contributionId: string[], githubUserId: number) => void;
  removeContributionId: (contributionId: string, githubUserId: number) => void;
  getSelectedContributionIds: (githubUserId: number) => string[];
}
