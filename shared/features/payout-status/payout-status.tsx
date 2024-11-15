import { PayoutStatusContent, PayoutStatusMapping } from "@/core/domain/reward/reward-constants";
import { AnyType } from "@/core/kernel/types";

import { Badge, BadgePort } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { PayoutStatusProps } from "@/shared/features/payout-status/payout-status.types";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

export function PayoutStatus({ status, billingProfileId, shouldRedirect }: PayoutStatusProps) {
  function getRedirectLink() {
    if (!billingProfileId || !shouldRedirect) return undefined;

    return marketplaceRouting(MARKETPLACE_ROUTER.settings.billing.generalInformation(billingProfileId));
  }

  const propsMapping: Record<PayoutStatusContent["type"], Partial<BadgePort<AnyType>>> = {
    error: {
      color: "error",
      shape: "squared",
      variant: "outline",
      as: "a",
      htmlProps: {
        href: getRedirectLink(),
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
    warning: {
      color: "grey",
      shape: "squared",
      as: "a",
      htmlProps: {
        href: getRedirectLink(),
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
    info: {
      color: "grey",
    },
    success: {
      color: "grey",
    },
  };

  const badgeProps = propsMapping[PayoutStatusMapping[status].type];

  return (
    <Badge
      size={"md"}
      translate={{ token: PayoutStatusMapping[status].label }}
      startContent={<Icon {...PayoutStatusMapping[status].icon} classNames={{ base: "text-text-2" }} />}
      classNames={{ base: "w-fit" }}
      {...badgeProps}
    />
  );
}
