import { CircleDollarSign } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";
import { CardFinancial } from "@/design-system/molecules/card-financial";

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
      avatarGroup={{
        avatars: buildAvatars(),
        maxAvatars: 3,
      }}
      size={"m"}
      color={type === "granted" ? "brand-2" : "container-3"}
    />
  );
}
export function ProjectFinancial({ data }: ProjectFinancialProps) {
  return (
    <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row gap-1">
          <CircleDollarSign size={16} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "panels:projectDetail.financials.title" }} />
        </div>
      </div>
      <div className={"flex w-full flex-row gap-3"}>
        <Card type={"granted"} values={data.totalGranted} />
        <Card type={"rewarded"} values={data.totalRewarded} />
      </div>
    </Paper>
  );
}
