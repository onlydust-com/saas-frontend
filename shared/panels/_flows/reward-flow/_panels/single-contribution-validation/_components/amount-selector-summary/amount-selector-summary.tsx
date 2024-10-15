import { useEffect, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { Summary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/summary/summary";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function AmountSelectorSummary() {
  const { isOpen } = useSingleContributionValidation();
  const { projectId = "" } = useRewardFlow();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

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
      setBudget(project.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isOpen) {
      setBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isOpen, project]);

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

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
          onAmountChange={handleAmountChange}
          budget={budget}
          allBudgets={allBudgets}
          onBudgetChange={handleBudgetChange}
        />
      </div>

      <Summary amount={amount} budget={budget} />
    </>
  );
}
