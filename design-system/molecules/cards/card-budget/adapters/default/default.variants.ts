import { tv } from "tailwind-variants";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "",
    icon: "",
  },
  variants: {
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
