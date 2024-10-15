import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordion } from "@/shared/features/card-budget-accordion/card-budget-accordion";
import { Translate } from "@/shared/translation/components/translate/translate";

import { SummaryProps } from "./summary.types";

export function Summary({ amount, budget }: SummaryProps) {
  const usdConversionRate = budget.usdConversionRate ?? 0;

  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = budget.amount - allocatedAmount;

  return (
    <CardBudgetAccordion
      defaultSelected={["balance-summary"]}
      items={[
        {
          id: "balance-summary",
          titleProps: {
            translate: {
              token: "panels:singleContributionValidation.summary.title",
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
              badgeProps: {
                children: <Translate token={"panels:singleContributionValidation.summary.currentBalance"} />,
              },
            },
            {
              amount: {
                value: allocatedAmount,
                currency: budget.currency,
                usdEquivalent: allocatedAmount * usdConversionRate,
              },
              badgeProps: { children: <Translate token={"panels:singleContributionValidation.summary.allocated"} /> },
              type: CardBudgetType.GRANTED,
            },
            {
              amount: {
                value: newBudgetBalance,
                currency: budget.currency,
                usdEquivalent: newBudgetBalance * usdConversionRate,
              },
              badgeProps: {
                children: <Translate token={"panels:singleContributionValidation.summary.finalBalance"} />,
              },
              isError: newBudgetBalance < 0,
            },
          ],
        },
      ]}
      multiple
    />
  );
}
