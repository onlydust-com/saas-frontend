"use client";

import { createContext, useContext, useState } from "react";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  selectedIssueIds: [],
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[]>([]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkFlow } = useBulkContributionSelection();

  function onOpenFlow({ githubUserIds, issueIds }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setSelectedIssueIds(issueIds);

    if (githubUserIds?.length > 1) {
      openBulkFlow();
    } else {
      openSingleFlow();
    }
  }

  return (
    <RewardFlowContext.Provider value={{ projectId, open: onOpenFlow, selectedGithubUserIds, selectedIssueIds }}>
      {children}
      <SingleContributionSelection />
      <BulkContributionSelection />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
