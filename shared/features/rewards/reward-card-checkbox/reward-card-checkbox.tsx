import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { RewardCardCheckboxProps } from "./reward-card-checkbox.types";

export function RewardCardCheckbox({
  amount,
  numberOfRewardedContributions,
  project,
  isDisabled,
  value,
  ...props
}: RewardCardCheckboxProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const currencyAmount = moneyKernelPort.format({
    amount: amount.amount,
    currency: amount.currency,
  });

  const usdEquivalent = moneyKernelPort.format({
    amount: amount.usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  function onCardClick() {
    if (props.onChange) {
      props.onChange(!value);
    }
  }

  return (
    <Paper
      border={value ? "active" : "primary"}
      classNames={{ base: "flex flex-col gap-lg" }}
      onClick={onCardClick}
      background="transparent"
    >
      <div className="flex justify-start gap-lg">
        <Avatar size={"sm"} shape={"squared"} src={amount?.currency?.logoUrl} />
        <div className={"flex flex-1 flex-col gap-md"}>
          <div className="flex flex-col">
            <Typo size={"sm"} weight={"medium"}>
              {currencyAmount.amount} {currencyAmount.code}
            </Typo>
            <Typo as={"div"} size={"sm"} color={"tertiary"}>
              {usdEquivalent.amount} {usdEquivalent.code}
            </Typo>
          </div>

          <div className="flex gap-sm">
            {numberOfRewardedContributions ? (
              <Badge size={"sm"}>
                <div className="flex gap-xs">
                  <Typo
                    size={"xs"}
                    color={"tertiary"}
                    translate={{ token: "features:contributorProfileCheckbox.badges.rewarded" }}
                  />
                  <Typo size={"xs"} color={"primary"}>
                    {numberOfRewardedContributions}
                  </Typo>
                </div>
              </Badge>
            ) : null}
            {!!project && (
              <Badge size={"sm"} avatar={{ src: project.logoUrl }}>
                {project.name}
              </Badge>
            )}
          </div>
        </div>
        <Checkbox
          isDisabled={isDisabled}
          {...props}
          {...(value ? { attr: { "data-focus": true } } : {})}
          value={value}
          classNames={{ base: "pointer-events-none" }}
        />
      </div>
    </Paper>
  );
}
