import { DepositButtonProps } from "@/app/financials/[sponsorId]/_views/financial/deposit-button/deposit-button.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useCurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.hooks";

export function DepositButton({ sponsorId }: DepositButtonProps) {
  const { open: openCurrencyListSidepanel } = useCurrencyListSidepanel();

  return (
    <Button
      variant={"primary"}
      size={"sm"}
      translate={{ token: "financials:details.financial.buttons.makeDeposit" }}
      classNames={{
        base: "max-w-full overflow-hidden",
        label: "whitespace-nowrap text-ellipsis overflow-hidden",
      }}
      onClick={() => openCurrencyListSidepanel({ sponsorId })}
    />
  );
}
