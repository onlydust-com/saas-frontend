import { useEffect, useState } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { toast } from "@/design-system/molecules/toaster";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";

export function useAllocateProgramSidepanel({ sponsorId, programId = "" }: { sponsorId: string; programId?: string }) {
  const { close } = useSidePanelsContext();
  const [budget, setBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

  const {
    data: program,
    isLoading,
    isError,
  } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  useEffect(() => {
    if (program) {
      // Set default selected budget
      setBudget(program.totalAvailable.totalPerCurrency?.[0]);
    }
  }, [program]);

  const { mutate, isPending } = SponsorReactQueryAdapter.client.useAllocateBudgetToProgram({
    pathParams: {
      sponsorId,
    },
    options: {
      onSuccess: () => {
        close();
        toast.success("SUCCESS");

        // TODO fix toaster messages

        // toast.success(
        //   <Translate token={"programs:grantForm.success.toast"} values={{
        //       project: project?.name,
        //       amount,
        //       code: selectedBudget?.currency.code,
        //     }}
        // />)
      },
      onError: () => {
        // toast.error(<Translate token={"programs:grantForm.error.toast"} />);
        toast.error("ERROR");
      },
    },
  });

  function handleAllocateBudget() {
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

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency) {
    setBudget(budget);
  }

  const usdConversionRate = budget?.usdConversionRate ?? 0;

  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = (budget?.amount ?? 0) - allocatedAmount;

  const programBudget = program?.totalAvailable.totalPerCurrency?.find(b => {
    return b.currency.id === budget?.currency.id;
  });

  const currentProgramBalance = programBudget?.amount ?? 0;
  const newProjectBalance = currentProgramBalance + allocatedAmount;

  return {
    amount,
    budget,
    handleAmountChange,
    handleBudgetChange,
    isLoading,
    isError,
    program: {
      data: program,
      isLoading,
      isError,
      usdAmount: programUsdAmount,
    },
    summary: {
      usdConversionRate,
      allocatedAmount,
      newBudgetBalance,
      currentProgramBalance,
      newProjectBalance,
      budget,
    },
    allocate: {
      post: handleAllocateBudget,
      isPending,
    },
  };
}
