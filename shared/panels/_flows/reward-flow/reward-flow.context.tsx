"use client";

import { createContext, useContext, useState } from "react";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { BulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  SelectedRewardsBudget,
  SelectedRewardsState,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  selectedIssueIds: [],
  removeContributionId: () => {},
  getSelectedContributionIds: () => [],
  addContributionIds: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[]>([]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [contributionState, setContributionState] = useState<SelectedRewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkFlow } = useBulkContributionSelection();

  function addContributionIds(contributionIds: string[], githubUserId: number) {
    setContributionState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: Array.from(new Set([...(prev[githubUserId]?.contributionIds || []), ...contributionIds])),
      },
    }));
  }

  function removeContributionId(contributionId: string, githubUserId: number) {
    setContributionState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: prev[githubUserId].contributionIds.filter(id => id !== contributionId),
      },
    }));
  }

  function updateAmount(githubUserId: number, amount: SelectedRewardsBudget) {
    setContributionState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        amount,
      },
    }));
  }

  function getSelectedContributionIds(githubUserId: number) {
    return contributionState[githubUserId]?.contributionIds || [];
  }

  function getAmount(githubUserId: number) {
    return contributionState[githubUserId].amount ?? { amount: "0" };
  }

  function onOpenFlow({ githubUserIds, issueIds, contributionIds = [] }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setSelectedIssueIds(issueIds);
    setContributionState(
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
        getSelectedContributionIds,
        removeContributionId,
        addContributionIds,
        updateAmount,
        getAmount,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributionValidation />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
