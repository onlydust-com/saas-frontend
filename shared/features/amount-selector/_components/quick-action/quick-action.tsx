import { Badge } from "@/design-system/atoms/badge";

import { AmountSelectorActions } from "@/shared/features/amount-selector/amount-selector.types";

import { QuickActionProps } from "./quick-action.types";

export function QuickAction({ actions, onAmountChange, budget }: QuickActionProps) {
  function onActionClick(action: AmountSelectorActions) {
    if (action.type === "USD") {
      const amount = action.value / (budget.usdConversionRate ?? 0);
      return onAmountChange(`${amount ?? 0}`);
    }

    if (action.type === "PERCENT") {
      const amount = budget.amount * (action.value / 100);
      return onAmountChange(`${amount ?? 0}`);
    }
  }

  return (
    <div className={"flex w-full flex-row items-center justify-center gap-1"}>
      {actions.map(action => (
        <Badge
          color={"brand"}
          variant={"outline"}
          key={`${action.value}-${action.type}`}
          as={"button"}
          htmlProps={{ onClick: () => onActionClick(action) }}
        >
          {action.label}
        </Badge>
      ))}
    </div>
  );
}
