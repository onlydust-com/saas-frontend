import { useEffect, useState } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { toast } from "@/design-system/molecules/toaster";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const PANEL_NAME = "ungrant-amount-selection";

export function useAmountSelection() {
  return useSinglePanelContext(PANEL_NAME);
}

export function useUngrantProgram({ projectId, programId }: { projectId: string; programId: string }) {
  const { close, isOpen } = useSidePanelsContext();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");
  const isPanelOpen = isOpen(PANEL_NAME);

  // TODO cant do this because only leads can viw
  const {
    data: program,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
  } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  const {
    data: projectFinancialDetails,
    isLoading: isLoadingProjectFinancialDetails,
    isError: isErrorProjectFinancialDetails,
  } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsById({
    pathParams: {
      projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const allBudgets = projectFinancialDetails?.totalAvailable.totalPerCurrency ?? [];

  useEffect(() => {
    if (isPanelOpen && projectFinancialDetails) {
      setBudget(projectFinancialDetails.totalAvailable.totalPerCurrency?.[0]);
      setAmount("0");
      return;
    }

    if (!isPanelOpen) {
      setBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isPanelOpen, projectFinancialDetails]);

  const { mutate, isPending } = ProjectReactQueryAdapter.client.useUngrantProject({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        close();
        toast.success(
          <Translate
            token={"panels:ungrantAmountSelection.toast.success"}
            values={{
              program: program?.name,
              amount,
              code: budget?.currency.code,
            }}
          />
        );
      },
      onError: () => {
        toast.error(<Translate token={"panels:ungrantAmountSelection.toast.error"} />);
      },
    },
    invalidateTagParams: {
      project: {
        pathParams: {
          projectSlug: projectFinancialDetails?.slug ?? "",
        },
      },
    },
  });

  function handleUngrant() {
    const currencyId = budget?.currency.id;

    if (!programId || !currencyId) return;

    mutate({
      programId,
      amount: parseFloat(amount),
      currencyId,
    });
  }

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: programUsdAmount } = moneyKernelPort.format({
    amount: program?.totalAvailable.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

  const usdConversionRate = budget?.usdConversionRate ?? 0;

  const ungrantedAmount = parseFloat(amount);
  const newBudgetBalance = (budget?.amount ?? 0) - ungrantedAmount;
  const newBalanceIsNegative = newBudgetBalance < 0;

  return {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    isLoading: isLoadingProgram || isLoadingProjectFinancialDetails,
    isError: isErrorProgram || isErrorProjectFinancialDetails,
    program,
    programUsdAmount,
    summary: {
      usdConversionRate,
      ungrantedAmount,
      newBudgetBalance,
      budget,
    },
    ungrant: {
      post: handleUngrant,
      isPending,
      newBalanceIsNegative,
    },
  };
}
