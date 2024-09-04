import { tv } from "tailwind-variants";

import { CardBudgetType } from "@/design-system/molecules/cards/card-budget";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "flex gap-2 text-left",
    icon: "",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer outline-none focus-visible:effect-ring-brand-spaced" } },
    type: {
      [CardBudgetType.GRANTED]: {
        icon: "text-utility-secondary-blue-500",
      },
      [CardBudgetType.RECEIVED]: {
        icon: "text-utility-secondary-green-500",
      },
    },
  },
  defaultVariants: {},
});
