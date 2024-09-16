import { tv } from "tailwind-variants";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "",
    title: "",
    description: "",
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
    isError: {
      true: {
        title: "text-typography-error",
        description: "text-typography-error",
      },
    },
  },
  defaultVariants: {},
});
