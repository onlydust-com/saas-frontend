import { useEffect } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { AmountSelectorSummaryProps } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/amount-selector-summary/amount-selector-summary.types";
import { Summary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/summary/summary";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function AmountSelectorSummary({ amount, budget, onAmountChange, onBudgetChange }: AmountSelectorSummaryProps) {
  const { isOpen } = useSingleContributionValidation();
  const { projectId = "" } = useRewardFlow();

  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsById({
    pathParams: {
      projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const allBudgets = project?.totalAvailable.totalPerCurrency ?? [];

  useEffect(() => {
    if (isOpen && project) {
      onAmountChange("0");
      onBudgetChange(project.totalAvailable.totalPerCurrency?.[0]);
      return;
    }

    if (!isOpen) {
      onAmountChange("0");
      onBudgetChange(undefined);
      return;
    }
  }, [isOpen, project]);

  if (isLoading) {
    return (
      <>
        <AmountSelectorLoading />

        <Skeleton classNames={{ base: "h-56" }} />
      </>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!project || !budget) {
    return null;
  }

  return (
    <>
      <div className="flex max-h-72 flex-1 items-center">
        <AmountSelector
          amount={amount}
          onAmountChange={onAmountChange}
          budget={budget}
          allBudgets={allBudgets}
          onBudgetChange={onBudgetChange}
        />
      </div>

      <Summary amount={amount} budget={budget} />
    </>
  );
}
