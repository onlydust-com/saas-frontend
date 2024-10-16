"use client";

import { createContext, useContext, useState } from "react";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { BulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  SelectedRewardsState,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

// TODO: Ajouter une condition no contributors pour ouvrir l'autre panel
export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  selectedIssueIds: [],
  removeContributionId: () => {},
  getSelectedContributionIds: () => [],
  addContributionIds: () => {},
  addContributorId: () => {},
  removeContributorId: () => {},
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[] | undefined>([]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [selectedContributionIds, setSelectedContributionIds] = useState<SelectedRewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkContributionFlow } = useBulkContributionSelection();
  const { open: openBulkContributorFlow } = useBulkContributorSelection();

  function addContributionIds(contributionIds: string[], githubUserId: number) {
    setSelectedContributionIds(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: Array.from(new Set([...(prev[githubUserId]?.contributionIds || []), ...contributionIds])),
      },
    }));
  }

  function addContributorId(contributorId: number) {
    setSelectedGithubUserIds(prev => Array.from(new Set([...(prev || []), contributorId])));
  }

  function removeContributorId(contributorId: number) {
    setSelectedGithubUserIds(prev => prev?.filter(id => id !== contributorId));
  }

  function removeContributionId(contributionId: string, githubUserId: number) {
    setSelectedContributionIds(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributionIds: prev[githubUserId].contributionIds.filter(id => id !== contributionId),
      },
    }));
  }

  function getSelectedContributionIds(githubUserId: number) {
    return selectedContributionIds[githubUserId]?.contributionIds || [];
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
      openBulkContributorFlow();
    } else {
      openBulkContributionFlow();
      // openSingleFlow();
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
        addContributorId,
        removeContributorId,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributorSelection />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
