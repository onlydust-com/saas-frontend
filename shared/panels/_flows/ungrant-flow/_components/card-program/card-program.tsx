import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardProgramProps } from "@/shared/panels/_flows/ungrant-flow/_components/card-program/card-program.types";

export function CardProgram({ program, onClick }: CardProgramProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount: totalUsdGranted, code: totalUsdCode } = moneyKernelPort.format({
    amount: program.totalGranted.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function renderContent() {
    if (!program.totalAvailable.totalPerCurrency) return null;

    return (
      <div className={"flex flex-wrap gap-md"}>
        {program.totalAvailable.totalPerCurrency.map(budget => {
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
      key={program.id}
      as={onClick ? "button" : "div"}
      onClick={onClick ? () => onClick(program) : undefined}
      size={"xl"}
      background={"secondary"}
      border={"primary"}
      titleProps={{ children: program.name }}
      avatarProps={{
        shape: "squared",
        size: "sm",
        src: program.logoUrl,
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
