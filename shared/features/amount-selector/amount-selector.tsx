import { ChevronDown } from "lucide-react";
import { ChangeEvent, useRef } from "react";

import { bootstrap } from "@/core/bootstrap";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { cn } from "@/shared/helpers/cn";

import { AmountSelectorProps } from "./amount-selector.types";

export function AmountSelector({
  amount,
  onAmountChange,
  budget,
  allBudgets,
  onBudgetChange,
  readOnly,
}: AmountSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { Panel, open, back } = useSidePanel({ name: "grant-budget" });

  if (!budget) return null;

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { amount: formattedBudgetAmount } = moneyKernelPort.format({
    amount: budget.amount,
    currency: budget.currency,
  });
  const { amount: formattedUsdAmount } = moneyKernelPort.format({
    amount: parseFloat(amount) * (budget.usdConversionRate ?? 0),
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  function handleChangeAmount(e: ChangeEvent<HTMLInputElement>) {
    if (!readOnly && onAmountChange) {
      let value = e.target.value;

      // Only allow numbers and one dot
      value = value.replace(/[^\d.]/g, "");

      if (value.length > 1 && value.startsWith("0")) {
        value = value.slice(1);
      }

      onAmountChange(value || "0");
    }
  }

  function handleChangeBudget(budget: DetailedTotalMoneyTotalPerCurrency) {
    if (!readOnly && onBudgetChange) {
      onBudgetChange(budget);
      back();
    }
  }

  return (
    <div className={"grid w-full gap-4 py-4"}>
      <div className={"grid gap-2"}>
        <div
          className={cn("mx-auto flex items-center gap-1 font-clash text-lg", {
            "text-xl": amount.length < 22,
            "text-2xl": amount.length < 18,
            "text-3xl": amount.length < 14,
            "text-4xl": amount.length < 11,
          })}
        >
          <input
            ref={inputRef}
            type="text"
            style={{ width: Math.min(Math.max(amount.length, 2), 50) + "ch" }}
            className={"flex bg-transparent text-right font-medium text-typography-primary outline-none"}
            value={amount}
            onChange={handleChangeAmount}
            readOnly={readOnly}
          />
          <div onClick={handleFocusInput}>
            <span className={"font-medium text-typography-primary"}>{budget.currency.code}</span>
          </div>
        </div>
        <Typo size={"md"} color={"secondary"} classNames={{ base: "text-center" }}>
          {formattedUsdAmount} USD
        </Typo>
      </div>

      <div>
        <div className={"flex w-full justify-center"}>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={open}
            endIcon={!readOnly ? { component: ChevronDown } : undefined}
            canInteract={!readOnly}
          >
            <AvatarLabelGroup
              avatars={[{ src: budget.currency.logoUrl, alt: budget.currency.name }]}
              size={"sm"}
              title={{
                children: `${budget.currency.name} • ${formattedBudgetAmount} ${budget.currency.code}`,
              }}
            />
          </Button>
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
      </div>
    </div>
  );
}
