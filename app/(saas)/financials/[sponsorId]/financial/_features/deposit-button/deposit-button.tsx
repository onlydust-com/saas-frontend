import { DepositButtonProps } from "@/app/(saas)/financials/[sponsorId]/financial/_features/deposit-button/deposit-button.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useCurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.hooks";

export function DepositButton({ sponsorId }: DepositButtonProps) {
  const { open: openCurrencyListSidepanel } = useCurrencyListSidepanel();

  return (
    <Button
      variant={"primary"}
      size={"sm"}
      translate={{ token: "financials:details.financial.actions.makeDeposit" }}
      classNames={{
        base: "max-w-full overflow-hidden",
        label: "whitespace-nowrap text-ellipsis overflow-hidden",
      }}
      onClick={() => openCurrencyListSidepanel({ sponsorId })}
    />
  );
}
