import { ChevronDown } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { CurrencySelectionProps } from "./currency-selection.types";

export function CurrencySelection({
  readOnly,
  budget,
  allBudgets,
  showBudgetAmount,
  onBudgetChange,
  id,
}: CurrencySelectionProps) {
  const { format } = bootstrap.getMoneyKernelPort();
  const { Panel, open, back } = useSidePanel({ name: id ? `grant-budget-${id}` : "grant-budget" });
  const { amount: formattedBudgetAmount } = format({
    amount: budget.amount,
    currency: budget.currency,
  });

  function handleChangeBudget(budget: DetailedTotalMoneyTotalPerCurrency) {
    if (!readOnly && onBudgetChange) {
      onBudgetChange(budget);
      back();
    }
  }

  return (
    <>
      <div className={"w-full overflow-hidden"}>
        <div className={"flex justify-center overflow-hidden"}>
          <Button
            variant={"primary"}
            size={"lg"}
            onClick={open}
            endIcon={!readOnly ? { component: ChevronDown } : undefined}
            canInteract={!readOnly}
            classNames={{ base: "overflow-hidden", label: "flex-1 overflow-hidden" }}
          >
            <AvatarLabelGroup
              avatars={[{ src: budget.currency.logoUrl, alt: budget.currency.name }]}
              size={"sm"}
              withPopover={false}
              title={{
                children: showBudgetAmount
                  ? `${budget.currency.name} • ${formattedBudgetAmount} ${budget.currency.code}`
                  : budget.currency.name,
              }}
            />
          </Button>
        </div>
      </div>
      {!readOnly && allBudgets ? (
        <Panel>
          <SidePanelHeader
            canGoBack={true}
            canClose={true}
            title={{ translate: { token: "features:amountSelector.currenciesAvailable.title" } }}
          />
          <SidePanelBody>
            <div className="grid gap-2">
              {allBudgets.map(budget => {
                return (
                  <CardBudget
                    as={"button"}
                    key={budget.currency.id}
                    amount={{
                      value: budget.amount,
                      currency: budget.currency,
                      usdEquivalent: budget.usdEquivalent ?? 0,
                    }}
                    badgeProps={{ children: budget.currency.name }}
                    onClick={() => handleChangeBudget(budget)}
                  />
                );
              })}
            </div>
          </SidePanelBody>
        </Panel>
      ) : null}
    </>
  );
}
