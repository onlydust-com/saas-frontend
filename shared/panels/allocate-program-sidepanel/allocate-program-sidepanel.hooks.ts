import { useEffect, useState } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export function useAllocateProgramSidepanel({ programId = "" }: { programId?: string }) {
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
  };
}
