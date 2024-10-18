"use client";

import { createContext, useContext, useState } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { ContributionItemDtoInterface } from "@/core/domain/contribution/dto/contribution-item-dto";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";

import { toast } from "@/design-system/molecules/toaster";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
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
import { Translate } from "@/shared/translation/components/translate/translate";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  removeContribution: () => {},
  getOtherWorks: () => [],
  getSelectedContributions: () => [],
  addOtherWorks: () => {},
  addContributions: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
  onCreateRewards: () => null,
  isCreatingRewards: false,
  addContributorId: () => {},
  removeContributorId: () => {},
  selectedGithubUserIds: [],
});

export function RewardFlowProvider({ children, projectId = "" }: RewardFlowContextProps) {
  const [rewardsState, setRewardsState] = useState<RewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkContributorFlow } = useBulkContributorSelection();
  const { close } = useSidePanelsContext();

  /***************** LOCAL FUNCTIONS *****************/
  const { mutate, isPending } = RewardReactQueryAdapter.client.useCreateRewards({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"panels:singleContributionValidation.toast.success"} />);
        close();
      },
      onError: () => {
        toast.error(<Translate token={"panels:singleContributionValidation.toast.error"} />);
      },
    },
  });

  function addContributors(
    prev: RewardsState,
    githubUserIds: number[],
    contributions?: ContributionItemDtoInterface[]
  ) {
    return {
      ...githubUserIds.reduce((acc, githubUserId) => {
        if (!acc[githubUserId]) {
          acc[githubUserId] = {
            contributions: contributions ?? [],
            amount: undefined,
            otherWorks: [],
          };
        }
        return acc;
      }, prev),
    };
  }

  /***************** ADD AND REMOVE CONTRIBUTORS *****************/

  function addContributorId(contributorId: number) {
    setRewardsState(prev => addContributors(prev, [contributorId]));
  }

  function removeContributorId(contributorId: number) {
    setRewardsState(prev => {
      const newState = { ...prev };
      delete newState[contributorId];
      return newState;
    });
  }

  /***************** AMOUNT MANAGEMENT *****************/
  function updateAmount(githubUserId: number, amount: SelectedRewardsBudget) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        amount,
      },
    }));
  }

  function getAmount(githubUserId: number) {
    return rewardsState[githubUserId]?.amount ?? { amount: "0" };
  }

  /***************** CONTRIBUTIONS MANAGEMENT *****************/

  function getOtherWorks(githubUserId: number) {
    return rewardsState[githubUserId]?.otherWorks || [];
  }

  function getSelectedContributions(githubUserId: number) {
    return rewardsState[githubUserId]?.contributions || [];
  }

  function addOtherWorks(otherWorks: RewardableItemInterface[], githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        otherWorks: Array.from(new Set([...(prev[githubUserId]?.otherWorks || []), ...otherWorks])),
        contributions: Array.from(
          new Set([...(prev[githubUserId]?.contributions || []), ...otherWorks.map(c => c.toContributionItemDto())])
        ),
      },
    }));
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

  /***************** FLOW MANAGEMENT *****************/

  function onOpenFlow({ githubUserIds, contributions = [] }: startFlowProps) {
    setRewardsState(prev => addContributors(prev, githubUserIds, contributions));

    if (githubUserIds.length === 1) {
      openSingleFlow();
    } else {
      openBulkContributorFlow();
    }
  }

  /***************** REWARDS MANAGEMENT *****************/
  function onCreateRewards() {
    mutate(
      Object.entries(rewardsState).map(([githubUserId, { contributions, amount }]) => {
        return {
          recipientId: Number(githubUserId),
          amount: Number(amount?.amount),
          currencyId: amount?.budget?.currency.id ?? "",
          items: contributions,
        };
      })
    );
  }

  const selectedGithubUserIds = Object.keys(rewardsState).map(Number) ?? [];

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        getOtherWorks,
        getSelectedContributions,
        removeContribution,
        addOtherWorks,
        addContributions,
        updateAmount,
        getAmount,
        addContributorId,
        removeContributorId,
        selectedGithubUserIds,
        onCreateRewards,
        isCreatingRewards: isPending,
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
