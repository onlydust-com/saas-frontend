import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";
import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { ProjectFinancialCardProps, ProjectFinancialProps } from "./project-financial.types";

function Card({ type, values }: ProjectFinancialCardProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  function buildTitle(): TranslateProps["token"] {
    if (type === "granted") {
      return "panels:projectDetail.financials.granted.title";
    }
    return "panels:projectDetail.financials.rewarded.title";
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
      color={type === "granted" ? "gradient" : "grey"}
    />
  );
}
export function ProjectFinancial({ data }: ProjectFinancialProps) {
  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.financials.title" }} />

      <div className={"flex w-full gap-md"}>
        <Card type={"granted"} values={data.totalGranted} />
        <Card type={"rewarded"} values={data.totalRewarded} />
      </div>
    </Paper>
  );
}
