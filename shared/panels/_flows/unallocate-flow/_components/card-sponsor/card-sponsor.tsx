import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardSponsorProps } from "@/shared/panels/_flows/unallocate-flow/_components/card-sponsor/card-sponsor.types";

export function CardSponsor({ sponsor, onClick }: CardSponsorProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount: totalUsdGranted, code: totalUsdCode } = moneyKernelPort.format({
    amount: sponsor.totalGranted.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function renderContent() {
    if (!sponsor.totalGranted.totalPerCurrency) return null;

    return (
      <div className={"flex flex-wrap gap-md"}>
        {sponsor.totalGranted.totalPerCurrency.map(budget => {
          const { amount, code } = moneyKernelPort.format({
            amount: budget.amount,
            currency: budget.currency,
          });

          return (
            <Badge key={budget.currency.id} size={"md"} avatar={{ src: budget.currency.logoUrl }}>
              {amount} {code}
            </Badge>
          );
        })}
      </div>
    );
  }

  return (
    <CardTemplate<"button" | "div">
      key={sponsor.id}
      as={onClick ? "button" : "div"}
      onClick={onClick ? () => onClick(sponsor) : undefined}
      size={"xl"}
      background={"secondary"}
      border={"primary"}
      titleProps={{ children: sponsor.name }}
      avatarProps={{
        shape: "squared",
        size: "sm",
        src: sponsor.logoUrl,
      }}
      actionSlot={
        <Button as={"div"} canInteract={false} size={"xs"} variant={"secondary"}>
          {totalUsdGranted} {totalUsdCode}
        </Button>
      }
      contentSlot={renderContent()}
    />
  );
}
