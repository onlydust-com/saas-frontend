import { PropsWithChildren, useState } from "react";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export interface startFlowProps {
  githubUserIds: number[];
  issueIds: string[];
  contributionIds?: string[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  selectedGithubUserIds?: number[];
  setSelectedGithubUserIds: ReturnType<typeof useState<number[]>>[1];
  selectedIssueIds: string[];
  selectedContributionIds?: string[];
  setSelectedContributionIds: ReturnType<typeof useState<string[] | undefined>>[1];
}
