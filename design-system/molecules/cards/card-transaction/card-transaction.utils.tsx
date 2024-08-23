import { ArrowDown, ArrowRight, CornerRightUp } from "lucide-react";
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
      icon: ArrowRight,
      iconProps: {
        className: "text-label-blue",
      },
    },
    RECEIVED: {
      icon: ArrowDown,
      iconProps: {
        className: "text-label-green",
      },
    },
    RETURNED: {
      icon: CornerRightUp,
      iconProps: {
        className: "text-label-red",
      },
    },
  };

  return {
    icon: map[type].icon,
    typeName: <Translate token={`cards:cardTransaction.types.${type}`} />,
  };
}
