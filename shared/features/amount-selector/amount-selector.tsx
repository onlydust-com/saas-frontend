import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Paper } from "@/design-system/atoms/paper";

import { AmountField } from "@/shared/features/amount-selector/_components/amount-field/amount-field";
import { CurrencySelection } from "@/shared/features/amount-selector/_components/currency-selection/currency-selection";
import { QuickAction } from "@/shared/features/amount-selector/_components/quick-action/quick-action";

import { AmountSelectorProps } from "./amount-selector.types";

export function AmountSelector({
  id,
  amount,
  onAmountChange,
  budget,
  allBudgets,
  onBudgetChange,
  readOnly,
  showBudgetAmount = true,
  actions = [],
}: AmountSelectorProps) {
  const isFilled = !!Number(amount);

  if (!budget) return null;

  function handleChangeBudget(budget: DetailedTotalMoneyTotalPerCurrency) {
    onBudgetChange?.(budget);
  }

  function handleAmountChange(value: string) {
    onAmountChange?.(value);
  }

  return (
    <Paper border="primary" size="lg" classNames={{ base: "app-gradient overflow-hidden py-9" }}>
      <div className={"relative z-[1] grid w-full gap-8"}>
        <AmountField
          onAmountChange={handleAmountChange}
          amount={amount}
          readOnly={readOnly}
          isFilled={isFilled}
          budget={budget}
        />

        <CurrencySelection
          readOnly={readOnly}
          budget={budget}
          allBudgets={allBudgets}
          showBudgetAmount={showBudgetAmount}
          onBudgetChange={handleChangeBudget}
          id={id}
        />

        <QuickAction actions={actions} onAmountChange={handleAmountChange} budget={budget} />
      </div>
    </Paper>
  );
}
