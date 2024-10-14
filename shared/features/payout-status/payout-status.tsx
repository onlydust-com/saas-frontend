import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";

import { PayoutStatusMapping, PayoutStatusProps } from "@/shared/features/payout-status/payout-status.types";

export function PayoutStatus({ status }: PayoutStatusProps) {
  // TODO : handle different statuses once rewards flow implemented
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
