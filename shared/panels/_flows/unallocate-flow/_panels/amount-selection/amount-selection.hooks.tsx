import { useEffect, useState } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { toast } from "@/design-system/molecules/toaster";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useUnallocateFlow } from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const PANEL_NAME = "unallocate-amount-selection";

export function useAmountSelection() {
  return useSinglePanelContext(PANEL_NAME);
}

export function useUnallocateProgram() {
  const { close, isOpen } = useSidePanelsContext();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");
  const isPanelOpen = isOpen(PANEL_NAME);
  const { programId, sponsor } = useUnallocateFlow();

  const sponsorId = sponsor?.id ?? "";

  const allBudgets = sponsor?.totalGranted.totalPerCurrency ?? [];

  useEffect(() => {
    if (isPanelOpen) {
      setBudget(allBudgets[0]);
      setAmount("0");
      return;
    }

    if (!isPanelOpen) {
      setBudget(undefined);
      setAmount("0");
      return;
    }
  }, [isPanelOpen]);

  const { mutate, isPending } = ProgramReactQueryAdapter.client.useUnallocateProgram({
    pathParams: {
      programId,
    },
    options: {
      onSuccess: () => {
        close();
        toast.success(
          <Translate
            token={"panels:unallocateAmountSelection.toast.success"}
            values={{
              sponsor: sponsor?.name,
              amount,
              code: budget?.currency.code,
            }}
          />
        );
      },
      onError: () => {
        toast.error(<Translate token={"panels:unallocateAmountSelection.toast.error"} />);
      },
    },
    invalidateTagParams: {
      sponsor: {
        pathParams: {
          sponsorId,
        },
      },
    },
  });

  function handleUnallocate() {
    const currencyId = budget?.currency.id;

    if (!programId || !currencyId) return;

    mutate({
      sponsorId,
      amount: parseFloat(amount),
      currencyId,
    });
  }

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

  const usdConversionRate = budget?.usdConversionRate ?? 0;

  const unallocatedAmount = parseFloat(amount);
  const newBudgetBalance = (budget?.amount ?? 0) - unallocatedAmount;
  const newBalanceIsNegative = newBudgetBalance < 0;

  return {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    summary: {
      usdConversionRate,
      unallocatedAmount,
      newBudgetBalance,
      budget,
    },
    unallocate: {
      post: handleUnallocate,
      isPending,
      newBalanceIsNegative,
    },
  };
}
