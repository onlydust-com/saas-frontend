import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

export function Summary({
  summary,
}: {
  summary: {
    usdConversionRate: number;
    allocatedAmount: number;
    newBudgetBalance: number;
    currentProgramBalance: number;
    newProjectBalance: number;
    budget?: DetailedTotalMoneyTotalPerCurrency;
  };
}) {
  const { usdConversionRate, allocatedAmount, newBudgetBalance, currentProgramBalance, newProjectBalance, budget } =
    summary;

  if (!budget) return null;

  return (
    <CardBudgetAccordion
      defaultSelected={["budgetBalance", "programBalance"]}
      items={[
        {
          id: "budgetBalance",
          titleProps: {
            translate: {
              token: "programs:grantForm.summary.budgetBalance",
              values: { budget: budget.currency.name },
            },
          },
          cards: [
            {
              amount: {
                value: budget.amount,
                currency: budget.currency,
                usdEquivalent: budget.usdEquivalent ?? 0,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.currentBalance"} /> },
            },
            {
              amount: {
                value: allocatedAmount,
                currency: budget.currency,
                usdEquivalent: allocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.allocated"} /> },
              type: CardBudgetType.GRANTED,
            },
            {
              amount: {
                value: newBudgetBalance,
                currency: budget.currency,
                usdEquivalent: newBudgetBalance * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.finalBalance"} /> },
              isError: newBudgetBalance < 0,
            },
          ],
        },
        {
          id: "programBalance",
          titleProps: { translate: { token: "panels:allocateProgram.summary.programBalance" } },
          cards: [
            {
              amount: {
                value: currentProgramBalance,
                currency: budget.currency,
                usdEquivalent: currentProgramBalance * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.currentBalance"} /> },
            },
            {
              amount: {
                value: allocatedAmount,
                currency: budget.currency,
                usdEquivalent: allocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.allocated"} /> },
              type: CardBudgetType.RECEIVED,
            },
            {
              amount: {
                value: newProjectBalance,
                currency: budget.currency,
                usdEquivalent: newProjectBalance * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:allocateProgram.summary.finalBalance"} /> },
            },
          ],
        },
      ]}
      multiple
    />
  );
}
