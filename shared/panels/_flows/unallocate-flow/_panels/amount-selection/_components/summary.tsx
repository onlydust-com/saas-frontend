import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

export function Summary({
  summary,
}: {
  summary: {
    usdConversionRate: number;
    unallocatedAmount: number;
    newBudgetBalance: number;
    budget?: DetailedTotalMoneyTotalPerCurrency;
  };
}) {
  const { usdConversionRate, unallocatedAmount, newBudgetBalance, budget } = summary;

  if (!budget) return null;

  return (
    <CardBudgetAccordion
      defaultSelected={["budgetBalance", "sponsorBalance"]}
      items={[
        {
          id: "budgetBalance",
          titleProps: {
            translate: {
              token: "panels:unallocateAmountSelection.summary.budgetBalance",
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
              badgeProps: { children: <Translate token={"panels:unallocateAmountSelection.summary.currentBalance"} /> },
            },
            {
              amount: {
                value: unallocatedAmount,
                currency: budget.currency,
                usdEquivalent: unallocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:unallocateAmountSelection.summary.unallocate"} /> },
              type: CardBudgetType.UNALLOCATED,
            },
            {
              amount: {
                value: newBudgetBalance,
                currency: budget.currency,
                usdEquivalent: newBudgetBalance * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:unallocateAmountSelection.summary.finalBalance"} /> },
              isError: newBudgetBalance < 0,
            },
          ],
        },
        {
          id: "sponsorBalance",
          titleProps: { translate: { token: "panels:unallocateAmountSelection.summary.sponsorBalance" } },
          cards: [
            {
              amount: {
                value: unallocatedAmount,
                currency: budget.currency,
                usdEquivalent: unallocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:unallocateAmountSelection.summary.unallocate"} /> },
              type: CardBudgetType.RECEIVED,
            },
          ],
        },
      ]}
      multiple
    />
  );
}
