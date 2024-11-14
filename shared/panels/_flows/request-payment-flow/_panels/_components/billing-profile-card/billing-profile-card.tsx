import { Ban, ChevronRight, Users } from "lucide-react";

import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon, IconPort } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { BillingProfileCardProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/billing-profile-card/billing-profile-card.types";
import { UseBillingProfileIcons } from "@/shared/panels/_flows/request-payment-flow/_panels/hooks/use-billing-profile-icons/use-billing-profile-icons";

export function BillingProfileCard({
  type,
  role,
  enabled,
  name,
  requestableRewardCount,
  isDisabled,
  onClick,
}: BillingProfileCardProps) {
  const { billingProfilesIcons } = UseBillingProfileIcons();

  function getIconProps(): IconPort {
    if (!enabled) {
      return { component: Ban };
    }

    if (role === BillingProfileRole.Member) {
      return { component: Users };
    }

    return billingProfilesIcons[type];
  }
  return (
    <Paper
      size={"lg"}
      background={"primary-alt"}
      border="primary"
      classNames={{ base: cn("flex gap-md justify-between items-center", { "pointer-events-none": isDisabled }) }}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex gap-lg">
        <Avatar shape="squared" size="lg" iconProps={getIconProps()} />
        <div className="flex flex-col gap-xs">
          <Typo size={"sm"} weight="medium" color={"primary"}>
            {name}
          </Typo>
          <Typo
            size={"xs"}
            color={"secondary"}
            translate={{ token: `common:billingProfileType.${role === BillingProfileRole.Member ? "EMPLOYEE" : type}` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-lg">
        <Badge
          size="xs"
          color={isDisabled ? "grey" : "brand"}
          translate={{ token: "features:billingProfileCard.requestableRewardCount", count: requestableRewardCount }}
        />
        {isDisabled ? <div className="w-4" /> : <Icon component={ChevronRight} />}
      </div>
    </Paper>
  );
}
