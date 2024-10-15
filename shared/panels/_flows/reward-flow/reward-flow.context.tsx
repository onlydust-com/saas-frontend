"use client";

import { createContext, useContext, useState } from "react";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  SelectedContributionIdsState,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  selectedIssueIds: [],
  addContributionId: () => {},
  removeContributionId: () => {},
  getSelectedContributionIds: () => [],
  addContributionsId: () => {},
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[]>([]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [selectedContributionIds, setSelectedContributionIds] = useState<SelectedContributionIdsState>([]);
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkFlow } = useBulkContributionSelection();

  function addContributionId(contributionId: string, githubUserId: number) {
    setSelectedContributionIds(prev => ({
      ...prev,
      [githubUserId]: [...(prev[githubUserId] || []), contributionId],
    }));
  }

  function addContributionsId(contributionIds: string[], githubUserId: number) {
    setSelectedContributionIds(prev => ({
      ...prev,
      [githubUserId]: [...(prev[githubUserId] || []), ...contributionIds],
    }));
  }

  function removeContributionId(contributionId: string, githubUserId: number) {
    setSelectedContributionIds(prev => ({
      ...prev,
      [githubUserId]: prev[githubUserId].filter(id => id !== contributionId),
    }));
  }

  function getSelectedContributionIds(githubUserId: number) {
    return selectedContributionIds[githubUserId] || [];
  }

  function onOpenFlow({ githubUserIds, issueIds, contributionIds = [] }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setSelectedIssueIds(issueIds);
    setSelectedContributionIds(
      githubUserIds.reduce((acc, githubUserId) => {
        return {
          ...acc,
          [githubUserId]: contributionIds,
        };
      }, {})
    );

    if (githubUserIds?.length > 1) {
      openBulkFlow();
    } else {
      openSingleFlow();
    }
  }

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        selectedGithubUserIds,
        selectedIssueIds,
        addContributionId,
        getSelectedContributionIds,
        removeContributionId,
        addContributionsId,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
