import { ArrowDown, ArrowRight, CornerRightUp } from "lucide-react";
import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CardTransactionTypes } from "./card-transaction.types";

export function getComponentsVariants(type: CardTransactionTypes): {
  iconProps: IconPort;
  typeName: ReactNode;
} {
  const map: Record<CardTransactionTypes, { iconProps: IconPort }> = {
    GRANTED: {
      iconProps: {
        component: ArrowRight,
        classNames: { base: "text-label-blue" },
      },
    },
    RECEIVED: {
      iconProps: {
        component: ArrowDown,
        classNames: { base: "text-label-green" },
      },
    },
    RETURNED: {
      iconProps: {
        component: CornerRightUp,
        classNames: { base: "text-label-red" },
      },
    },
  };

  return {
    iconProps: map[type].iconProps,
    typeName: <Translate token={`cards:cardTransaction.types.${type}`} />,
  };
}
