import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CardTransactionStatus } from "./card-transaction.types";

export function getComponentsVariants(status: CardTransactionStatus): {
  icon: IconPort;
  statusName: ReactNode;
} {
  const map: Record<CardTransactionStatus, { icon: IconPort; statusName: ReactNode }> = {
    granted: {
      icon: {
        name: "ri-arrow-right-line",
        className: "text-label-blue",
      },
      statusName: <Translate token="cards:cardTransaction.status.granted" />,
    },
    allocated: {
      icon: {
        name: "ri-arrow-down-line",
        className: "text-label-green",
      },
      statusName: <Translate token="cards:cardTransaction.status.allocated" />,
    },
    returned: {
      icon: {
        name: "ri-arrow-turn-forward-line",
        className: "text-label-red",
      },
      statusName: <Translate token="cards:cardTransaction.status.returned" />,
    },
  };

  return map[status];
}
