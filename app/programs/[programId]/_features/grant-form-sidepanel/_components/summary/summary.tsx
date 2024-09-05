import { SummaryProps } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary.types";

import { Accordion } from "@/design-system/molecules/accordion";
import { CardBudget, CardBudgetType } from "@/design-system/molecules/cards/card-budget";

import { Translate } from "@/shared/translation/components/translate/translate";

export function Summary({ amount, budget, project }: SummaryProps) {
  const usdConversionRate = budget.usdConversionRate ?? 0;

  const allocatedAmount = parseFloat(amount);
  const newBudgetBalance = budget.amount - allocatedAmount;

  const projectBudget = project.totalAvailable.totalPerCurrency?.find(b => {
    return b.currency.id === budget.currency.id;
  });

  const currentProjectBalance = projectBudget?.amount ?? 0;
  const newProjectBalance = currentProjectBalance + allocatedAmount;

  return (
    <Accordion
      multiple
      items={[
        {
          id: "budgetBalance",
          titleProps: {
            translate: {
              token: "programs:grantForm.summary.budgetBalance",
              values: { budget: budget.currency.name },
            },
          },
          content: (
            <>
              <div>
                <CardBudget
                  amount={{
                    value: budget.amount,
                    currency: budget.currency,
                    usdEquivalent: budget.usdEquivalent ?? 0,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.currentBalance"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                />
              </div>
              <div>
                <CardBudget
                  amount={{
                    value: allocatedAmount,
                    currency: budget.currency,
                    usdEquivalent: allocatedAmount * usdConversionRate,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.allocated"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                  type={CardBudgetType.GRANTED}
                />
              </div>
              <div>
                <CardBudget
                  amount={{
                    value: newBudgetBalance,
                    currency: budget.currency,
                    usdEquivalent: newBudgetBalance * usdConversionRate,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.finalBalance"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                />
              </div>
            </>
          ),
        },
        {
          id: "projectBalance",
          titleProps: { translate: { token: "programs:grantForm.summary.projectBalance" } },
          content: (
            <>
              <div>
                <CardBudget
                  amount={{
                    value: currentProjectBalance,
                    currency: budget.currency,
                    usdEquivalent: currentProjectBalance * usdConversionRate,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.currentBalance"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                />
              </div>
              <div>
                <CardBudget
                  amount={{
                    value: allocatedAmount,
                    currency: budget.currency,
                    usdEquivalent: allocatedAmount * usdConversionRate,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.allocated"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                  type={CardBudgetType.RECEIVED}
                />
              </div>
              <div>
                <CardBudget
                  amount={{
                    value: newProjectBalance,
                    currency: budget.currency,
                    usdEquivalent: newProjectBalance * usdConversionRate,
                  }}
                  badgeProps={{ children: <Translate token={"programs:grantForm.summary.finalBalance"} /> }}
                  size={"none"}
                  background={"transparent"}
                  border={"none"}
                />
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
