import { PropsWithChildren } from "react";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export interface startFlowProps {
  githubUserIds: number[];
  issueIds: string[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  selectedGithubUserIds: number[];
  selectedIssueIds: string[];
}
