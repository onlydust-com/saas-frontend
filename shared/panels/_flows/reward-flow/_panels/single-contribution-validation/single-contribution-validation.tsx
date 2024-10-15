import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { toast } from "@/design-system/molecules/toaster";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserProfileCard } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card";
import { AmountSelectorSummary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/amount-selector-summary/amount-selector-summary";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function SingleContributionValidation() {
  const { name, isOpen } = useSingleContributionValidation();
  const { Panel } = useSidePanel({ name });
  const { projectId = "", getSelectedContributionIds, selectedGithubUserIds } = useRewardFlow();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");
  const amountNumber = Number(amount);

  const [selectedGithubUserId] = selectedGithubUserIds;
  const selectedContributionIds = getSelectedContributionIds(selectedGithubUserId);

  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  // TODO replace with /contributions with contribution ids once implemented
  const { data: contributions, isLoading } = useQueries({
    queries: selectedContributionIds.map(contributionId => {
      const { tag, request } = contributionStoragePort.getContributionsById({
        pathParams: {
          contributionId,
        },
      });

      return {
        queryKey: tag,
        queryFn: request,
        enabled: Boolean(selectedContributionIds) && isOpen,
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data).filter(Boolean),
        isLoading: results.some(result => result.isLoading),
      };
    },
  });

  const nonNullContributions = useMemo(
    () => contributions?.filter(Boolean) ?? [],
    [contributions]
  ) as ContributionActivityInterface[];

  const { mutate, isPending } = RewardReactQueryAdapter.client.useCreateRewards({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"panels:singleContributionValidation.toast.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"panels:singleContributionValidation.toast.error"} />);
      },
    },
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency | undefined) {
    setBudget(budget);
  }

  function handleCreateRewards() {
    if (amountNumber > 0) {
      mutate(
        selectedGithubUserIds.map(recipientId => ({
          recipientId,
          amount: amountNumber,
          currencyId: budget?.currency?.id ?? "",
          items: nonNullContributions.map(c => ({
            type: c.type,
            id: c.id,
            number: c.githubNumber,
            repoId: c.repo.id,
          })),
        }))
      );
    }
  }

  function getTimelineContributionProps() {
    if (!isLoading && Boolean(contributions)) {
      return {
        titleProps: {
          children: (
            <>
              <Translate token={"common:contributions"} /> ({selectedContributionIds?.length})
            </>
          ),
        },
        contributions: nonNullContributions.map(c => ({
          githubTitle: c.githubTitle,
          contributionBadgeProps: {
            type: c.type,
            githubStatus: c.githubStatus,
            number: c.githubNumber,
          },
        })),
      };
    }
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionValidation.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <UserProfileCard
          timelineContributionProps={getTimelineContributionProps()}
          githubUserId={selectedGithubUserId}
        />

        <AmountSelectorSummary
          amount={amount}
          budget={budget}
          onAmountChange={handleAmountChange}
          onBudgetChange={handleBudgetChange}
        />
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:reward",
          }}
          isDisabled={isPending || amountNumber <= 0}
          onClick={() => handleCreateRewards()}
        />
      </SidePanelFooter>
    </Panel>
  );
}
