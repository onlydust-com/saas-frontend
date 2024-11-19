import { useClipboard } from "@nextui-org/use-clipboard";
import { Copy } from "lucide-react";
import { ReactNode, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { UseBillingProfileIcons } from "@/shared/panels/_flows/request-payment-flow/_panels/hooks/use-billing-profile-icons/use-billing-profile-icons";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BillingProfileAccordionProps } from "./billing-profile-accordion.types";

export function BillingProfileAccordion({ id, type, name, rewardCount, accounts }: BillingProfileAccordionProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { billingProfilesIcons } = UseBillingProfileIcons();
  const { copy } = useClipboard();

  const accountsArray: { code: string; label: ReactNode; icon: ReactNode; value: string }[] = useMemo(() => {
    const _accounts = [];

    if (accounts.optimismAddress) {
      const currency = moneyKernelPort.getCurrency("OP");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.wallet"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.optimismAddress,
        code: currency.code,
      });
    }

    if (accounts.aptosAddress) {
      const currency = moneyKernelPort.getCurrency("APT");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.wallet"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.aptosAddress,
        code: currency.code,
      });
    }

    if (accounts.ethWallet) {
      const currency = moneyKernelPort.getCurrency("ETH");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.wallet"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.ethWallet,
        code: currency.code,
      });
    }

    if (accounts.starknetAddress) {
      const currency = moneyKernelPort.getCurrency("STRK");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.wallet"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.starknetAddress,
        code: currency.code,
      });
    }

    if (accounts.stellarAccountId) {
      const currency = moneyKernelPort.getCurrency("XLM");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.account"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.stellarAccountId,
        code: currency.code,
      });
    }

    if (accounts.nearAccountId) {
      const currency = moneyKernelPort.getCurrency("XLM");
      _accounts.push({
        label: <Translate token={"panels:requestPaymentFlow.accounts.account"} values={{ name: currency.name }} />,
        icon: <Avatar size={"xxs"} src={currency.logoUrl} enableOptimizedImage={false} />,
        value: accounts.nearAccountId,
        code: currency.code,
      });
    }

    return _accounts;
  }, [accounts]);

  return (
    <Paper size={"lg"} background={"primary-alt"} border="primary" classNames={{ base: "flex gap-md" }}>
      <Accordion
        id={id}
        titleProps={{
          children: (
            <div className={"flex flex-col gap-1"}>
              <Typo size={"sm"} weight={"medium"}>
                {name}
              </Typo>
              <Typo size={"xs"} weight={"medium"} color={"secondary"}>
                {type}
              </Typo>
            </div>
          ),
        }}
        inline={true}
        startContent={<Avatar shape="squared" size="lg" iconProps={billingProfilesIcons[type]} />}
        endContent={
          <Badge
            color={"brand"}
            size={"xs"}
            translate={{ token: "panels:requestPaymentFlow.rewardsCount", count: rewardCount }}
          />
        }
      >
        <div className={"flex flex-col gap-3 py-3"}>
          {accountsArray.map(account => (
            <div key={account.code} className={"flex items-center gap-1"}>
              <Input
                name={account.code}
                value={account.value}
                canInteract={false}
                endContent={
                  <Button
                    iconOnly={true}
                    size={"xs"}
                    variant={"tertiary"}
                    startIcon={{ component: Copy }}
                    onClick={() => copy(account.value)}
                  />
                }
                label={
                  <div className={"flex flex-row items-center justify-start gap-1"}>
                    {account.icon}
                    <Typo size={"sm"} weight={"medium"} color={"secondary"}>
                      {account.label}
                    </Typo>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </Accordion>
    </Paper>
  );
}
