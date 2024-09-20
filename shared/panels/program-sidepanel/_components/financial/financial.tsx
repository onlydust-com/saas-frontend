import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";
import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import { FinancialCardProps, FinancialProps } from "./financial.types";

function Card({ type, values }: FinancialCardProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const config = {
    available: {
      title: "panels:program.financials.available.title",
      color: "gradient",
    },
    granted: {
      title: "panels:program.financials.granted.title",
      color: "grey",
    },
  } as const;

  function buildAvatars(): AvatarGroupPort<AnyType>["avatars"] {
    if (values.totalPerCurrency) {
      return values.totalPerCurrency.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      }));
    }
    return [];
  }

  const amount = moneyKernelPort.format({
    amount: values.totalUsdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  }).amount;

  return (
    <CardFinancial
      title={{ token: config[type].title }}
      amount={amount}
      currency={moneyKernelPort.getCurrency("USD").code}
      avatarGroup={{ avatars: buildAvatars() }}
      size={"m"}
      color={config[type].color}
    />
  );
}

export function Financial({ data }: FinancialProps) {
  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:program.financials.title" }} />

      <div className={"flex w-full gap-md"}>
        <Card type={"available"} values={data.totalAvailable} />
        <Card type={"granted"} values={data.totalGranted} />
      </div>
    </Paper>
  );
}
