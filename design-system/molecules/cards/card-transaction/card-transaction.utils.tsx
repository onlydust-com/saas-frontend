import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CardTransactionTypes } from "./card-transaction.types";

export function getComponentsVariants(type: CardTransactionTypes): {
  icon: IconPort;
  typeName: ReactNode;
} {
  const map: Record<CardTransactionTypes, { icon: IconPort }> = {
    GRANTED: {
      icon: {
        name: "arrow-right",
        className: "text-label-blue",
      },
    },
    RECEIVED: {
      icon: {
        name: "arrow-down",
        className: "text-label-green",
      },
    },
    RETURNED: {
      icon: {
        name: "corner-right-up",
        className: "text-label-red",
      },
    },
  };

  return {
    icon: map[type].icon,
    typeName: <Translate token={`cards:cardTransaction.types.${type}`} />,
  };
}
