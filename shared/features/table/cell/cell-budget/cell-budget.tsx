import { useLayoutEffect, useRef } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";

import { CellBudgetProps } from "./cell-budget.types";

export function CellBudget({ totalUsdEquivalent: _totalUsdEquivalent, totalPerCurrency = [] }: CellBudgetProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const usdRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalUsdEquivalent = moneyKernelPort.format({
    amount: _totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  useLayoutEffect(() => {
    if (usdRef?.current && containerRef?.current) {
      const usdWidth = usdRef.current.offsetWidth;
      containerRef.current.style.width = `${usdWidth}px`;
    }
  }, [usdRef, containerRef]);

  if (!totalPerCurrency?.length) {
    return <CellEmpty />;
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <div className={"flex min-w-full flex-col"} ref={containerRef}>
              <div className={"w-fit"} ref={usdRef}>
                <Typo size="sm" weight="medium" color="secondary" classNames={{ base: "whitespace-nowrap" }}>
                  {`~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}`}
                </Typo>
              </div>
              <Typo size={"xs"} color="tertiary" classNames={{ base: "line-clamp-1" }}>
                {totalPerCurrency?.map(total => total.currency.name).join(", ")}
              </Typo>
            </div>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="h-fit w-fit overflow-hidden">
            <ScrollView className={"max-h-[300px]"}>
              <div className="flex w-fit flex-col gap-2">
                {totalPerCurrency?.map(amount => {
                  return (
                    <CardBudget
                      key={amount.currency.id}
                      amount={{
                        value: amount.amount,
                        currency: amount.currency,
                        usdEquivalent: amount.usdEquivalent ?? 0,
                      }}
                      background={"secondary"}
                      border={"primary"}
                      badgeProps={{ color: "brand", children: amount.currency.name }}
                    />
                  );
                })}
              </div>
            </ScrollView>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
