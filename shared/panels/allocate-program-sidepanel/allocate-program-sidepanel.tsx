import { useEffect, useState } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { AllocateProgramSidepanelProps } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function AllocateProgramSidepanel({ programId = "" }: AllocateProgramSidepanelProps) {
  const [selectedBudget, setSelectedBudget] = useState<DetailedTotalMoneyTotalPerCurrency>();
  const [amount, setAmount] = useState("0");

  // TODO @hayden refactor to hook ?

  const { data, isLoading, isError } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  useEffect(() => {
    if (data) {
      // Set default selected budget
      setSelectedBudget(data.totalAvailable.totalPerCurrency?.[0]);
    }
  }, [data]);

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: programUsdAmount, code: programUsdCode } = moneyKernelPort.format({
    amount: data?.totalAvailable.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function handleAmountChange(amount: string) {
    setAmount(amount);
  }

  function handleBudgetChange(budget: DetailedTotalMoneyTotalPerCurrency) {
    setSelectedBudget(budget);
  }

  function renderBody() {
    if (isLoading) {
      return (
        <div className="flex h-full flex-col gap-3">
          <CardProjectLoading />

          <AmountSelectorLoading />

          <AccordionLoading />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!data || !selectedBudget || !data.totalAvailable.totalPerCurrency) return null;

    const usdConversionRate = selectedBudget.usdConversionRate ?? 0;

    const allocatedAmount = parseFloat(amount);
    const newBudgetBalance = selectedBudget.amount - allocatedAmount;

    const programBudget = data?.totalAvailable.totalPerCurrency?.find(b => {
      return b.currency.id === selectedBudget.currency.id;
    });

    const currentProgramBalance = programBudget?.amount ?? 0;
    const newProjectBalance = currentProgramBalance + allocatedAmount;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardProject
          title={data.name}
          logoUrl={data.logoUrl}
          buttonProps={{
            children: `${programUsdAmount} ${programUsdCode}`,
            classNames: {
              base: "pointer-events-none whitespace-nowrap",
            },
          }}
        />

        <div className="flex max-h-72 flex-1 items-center">
          <AmountSelector
            amount={amount}
            onAmountChange={handleAmountChange}
            budget={selectedBudget}
            allBudgets={data.totalAvailable.totalPerCurrency}
            onBudgetChange={handleBudgetChange}
          />
        </div>

        <CardBudgetAccordion
          defaultSelected={["budgetBalance", "projectBalance"]}
          items={[
            {
              id: "budgetBalance",
              titleProps: {
                translate: {
                  token: "programs:grantForm.summary.budgetBalance",
                  values: { budget: selectedBudget.currency.name },
                },
              },
              cards: [
                {
                  amount: {
                    value: selectedBudget.amount,
                    currency: selectedBudget.currency,
                    usdEquivalent: selectedBudget.usdEquivalent ?? 0,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.currentBalance"} /> },
                },
                {
                  amount: {
                    value: allocatedAmount,
                    currency: selectedBudget.currency,
                    usdEquivalent: allocatedAmount * usdConversionRate,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.allocated"} /> },
                  type: CardBudgetType.GRANTED,
                },
                {
                  amount: {
                    value: newBudgetBalance,
                    currency: selectedBudget.currency,
                    usdEquivalent: newBudgetBalance * usdConversionRate,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.finalBalance"} /> },
                },
              ],
            },
            {
              id: "projectBalance",
              titleProps: { translate: { token: "panels:allocateProgram.summary.programBalance" } },
              cards: [
                {
                  amount: {
                    value: currentProgramBalance,
                    currency: selectedBudget.currency,
                    usdEquivalent: currentProgramBalance * usdConversionRate,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.currentBalance"} /> },
                },
                {
                  amount: {
                    value: allocatedAmount,
                    currency: selectedBudget.currency,
                    usdEquivalent: allocatedAmount * usdConversionRate,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.allocated"} /> },
                  type: CardBudgetType.RECEIVED,
                },
                {
                  amount: {
                    value: newProjectBalance,
                    currency: selectedBudget.currency,
                    usdEquivalent: newProjectBalance * usdConversionRate,
                  },
                  badgeProps: { children: <Translate token={"panels:allocateProgram.summary.finalBalance"} /> },
                },
              ],
            },
          ]}
          multiple
        />
      </div>
    );
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:allocateProgram.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>{renderBody()}</SidePanelBody>

      <SidePanelFooter>
        <Button variant={"secondary"} size={"md"}>
          <Translate token={"panels:allocateProgram.makeAllocation"} />
        </Button>
      </SidePanelFooter>
    </>
  );
}
