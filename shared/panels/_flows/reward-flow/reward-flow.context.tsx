"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { ContributionItemDtoInterface } from "@/core/domain/contribution/dto/contribution-item-dto";
import { CreateRewardsBody } from "@/core/domain/reward/reward-contract.types";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { BulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation";
import { BulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  RewardsState,
  SelectedRewardsBudget,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  removeContribution: () => {},
  getSelectedContributions: () => [],
  addContributions: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
  getRewardBody: () => [],
  addContributorId: () => {},
  removeContributorId: () => {},
  selectedGithubUserIds: [],
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [rewardsState, setRewardsState] = useState<RewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkContributorFlow } = useBulkContributorSelection();

  function addContributor(prev: RewardsState, githubUserId: number, contributions?: ContributionItemDtoInterface[]) {
    if (!prev[githubUserId]) {
      prev[githubUserId] = {
        contributions: contributions ?? [],
        amount: undefined,
      };
    }
    return prev;
  }

  function addContributors(
    prev: RewardsState,
    githubUserIds: number[],
    contributions?: ContributionItemDtoInterface[]
  ) {
    return githubUserIds.reduce((acc, githubUserId) => addContributor(acc, githubUserId, contributions), prev);
  }

  function getSelectedGithubUserIds() {
    return Object.keys(rewardsState).map(Number) ?? [];
  }

  function addContributions(contributions: ContributionItemDtoInterface[], githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: Array.from(new Set([...(prev[githubUserId]?.contributions || []), ...contributions])),
      },
    }));
  }

  function removeContribution(contribution: ContributionItemDtoInterface, githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: prev[githubUserId]?.contributions.filter(c => !c.isEqualTo(contribution)),
      },
    }));
  }

  function addContributorId(contributorId: number) {
    setRewardsState(prev => addContributor(prev, contributorId));
  }

  function removeContributorId(contributorId: number) {
    setRewardsState(prev => {
      const newState = { ...prev };
      delete newState[contributorId];
      return newState;
    });
  }

  function updateAmount(githubUserId: number, amount: SelectedRewardsBudget) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        amount,
      },
    }));
  }

  function getSelectedContributions(githubUserId: number) {
    return rewardsState[githubUserId]?.contributions || [];
  }

  function getAmount(githubUserId: number) {
    return rewardsState[githubUserId]?.amount ?? { amount: "0" };
  }

  function onOpenFlow({ githubUserIds, contributions = [] }: startFlowProps) {
    setRewardsState(prev => addContributors(prev, githubUserIds, contributions));

    if (githubUserIds?.length > 1) {
      openBulkContributorFlow();
    } else {
      openSingleFlow();
    }
  }

  function getRewardBody(): CreateRewardsBody {
    return Object.entries(rewardsState).map(([githubUserId, { contributions, amount }]) => {
      return {
        recipientId: Number(githubUserId),
        amount: Number(amount?.amount),
        currencyId: amount?.budget?.currency.id ?? "",
        items: contributions,
      };
    });
  }

  const selectedGithubUserIds = useMemo(() => getSelectedGithubUserIds(), [rewardsState]);

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        getSelectedContributions,
        removeContribution,
        addContributions,
        updateAmount,
        getAmount,
        getRewardBody,
        addContributorId,
        removeContributorId,
        selectedGithubUserIds,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributorSelection />
      <BulkContributionValidation />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
