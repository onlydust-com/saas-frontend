import { ChevronRight } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { BillingProfileCardProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card.types";
import { UseBillingProfileIcons } from "@/shared/panels/_flows/request-payment-flow/_panels/hooks/use-billing-profile-icons/use-billing-profile-icons";

export function BillingProfileCard({
  type,
  name,
  requestableRewardCount,
  isDisabled,
  onClick,
}: BillingProfileCardProps) {
  const { billingProfilesIcons } = UseBillingProfileIcons();
  return (
    <Paper
      size={"lg"}
      background={isDisabled ? "disabled" : "primary-alt"}
      border="primary"
      classNames={{ base: cn("flex gap-md justify-between items-center", { "pointer-events-none": isDisabled }) }}
      onClick={onClick}
    >
      <div className="flex gap-lg">
        <Avatar shape="squared" size="lg" iconProps={billingProfilesIcons[type]} />
        <div className="flex flex-col gap-xs">
          <Typo size={"sm"} weight="medium" color={"primary"}>
            {name}
          </Typo>
          <Typo size={"xs"} color={"secondary"} translate={{ token: `common:billingProfileType.${type}` }} />
        </div>
      </div>
      <div className="flex items-center gap-lg">
        <Badge
          size="xs"
          color={"brand"}
          translate={{ token: "features:billingProfileCard.requestableRewardCount", count: requestableRewardCount }}
        />
        <Icon component={ChevronRight} />
      </div>
    </Paper>
  );
}
