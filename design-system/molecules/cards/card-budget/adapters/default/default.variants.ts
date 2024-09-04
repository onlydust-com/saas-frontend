import { tv } from "tailwind-variants";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "flex gap-2 text-left",
    icon: "",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer outline-none focus-visible:effect-ring-brand-spaced" } },
    type: {
      GRANTED: {
        icon: "text-utility-secondary-blue-500",
      },
      RECEIVED: {
        icon: "text-utility-secondary-green-500",
      },
    },
  },
  defaultVariants: {},
});
