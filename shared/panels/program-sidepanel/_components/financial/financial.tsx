import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";
import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { FinancialCardProps, FinancialProps } from "./financial.types";

function Card({ type, values }: FinancialCardProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  function buildTitle(): TranslateProps["token"] {
    if (type === "available") {
      return "panels:program.financials.available.title";
    }

    return "panels:program.financials.granted.title";
  }

  function buildAvatars(): AvatarGroupPort<AnyType>["avatars"] {
    if (values.totalPerCurrency) {
      return values.totalPerCurrency.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      }));
    }
    return [];
  }

  function formatAmount() {
    return moneyKernelPort.format({
      amount: values.totalUsdEquivalent,
      currency: moneyKernelPort.getCurrency("USD"),
    }).amount;
  }

  return (
    <CardFinancial
      title={{ token: buildTitle() }}
      amount={formatAmount()}
      currency={moneyKernelPort.getCurrency("USD").code}
      avatarGroup={{ avatars: buildAvatars() }}
      size={"m"}
      color={type === "available" ? "gradient" : "grey"}
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
