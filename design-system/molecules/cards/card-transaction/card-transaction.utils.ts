import { IconPort } from "@/design-system/atoms/icon";

import { CardTransactionStatus } from "./card-transaction.types";

export function getComponentsVariants(status: CardTransactionStatus): {
  icon: IconPort;
  statusName: string;
} {
  const map: Record<CardTransactionStatus, { icon: IconPort; statusName: string }> = {
    granted: {
      icon: {
        name: "ri-arrow-right-line",
        className: "text-label-blue",
      },
      statusName: "Granted",
    },
    allocated: {
      icon: {
        name: "ri-arrow-down-line",
        className: "text-label-green",
      },
      statusName: "Allocated",
    },
    returned: {
      icon: {
        name: "ri-arrow-turn-forward-line",
        className: "text-label-red",
      },
      statusName: "Returned",
    },
  };

  return map[status];
}
