import { PayoutStatusMapping } from "@/core/domain/reward/reward-constants";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";

import { PayoutStatusProps } from "@/shared/features/payout-status/payout-status.types";

export function PayoutStatus({ status }: PayoutStatusProps) {
  return (
    <Badge
      size={"md"}
      color={"grey"}
      translate={{ token: PayoutStatusMapping[status].label }}
      startContent={<Icon {...PayoutStatusMapping[status].icon} classNames={{ base: "text-text-2" }} />}
      classNames={{ base: "w-fit" }}
    />
  );
}
