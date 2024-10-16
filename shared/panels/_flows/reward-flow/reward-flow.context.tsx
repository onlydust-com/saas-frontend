"use client";

import { createContext, useContext, useState } from "react";

import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";

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
  removeContribution: () => {},
  getSelectedContributions: () => [],
  addContributions: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[]>([]);
  const [contributionState, setContributionState] = useState<SelectedRewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkFlow } = useBulkContributionSelection();

  function addContributions(contributions: ContributionItemDto[], githubUserId: number) {
    setContributionState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: Array.from(new Set([...(prev[githubUserId]?.contributions || []), ...contributions])),
      },
    }));
  }

  function removeContribution(contribution: ContributionItemDto, githubUserId: number) {
    setContributionState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: prev[githubUserId].contributions.filter(c => !c.isEqualTo(contribution)),
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

  function getSelectedContributions(githubUserId: number) {
    console.log("dd", contributionState[githubUserId], contributionState[githubUserId]?.contributions || []);
    return contributionState[githubUserId]?.contributions || [];
  }

  function getAmount(githubUserId: number) {
    return contributionState[githubUserId].amount ?? { amount: "0" };
  }

  function onOpenFlow({ githubUserIds, contributions = [] }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setContributionState(
      githubUserIds.reduce((acc, githubUserId) => {
        return {
          ...acc,
          [githubUserId]: {
            contributions,
            amount: undefined,
          },
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
        getSelectedContributions,
        removeContribution,
        addContributions,
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
