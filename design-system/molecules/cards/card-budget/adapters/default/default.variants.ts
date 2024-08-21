import { tv } from "tailwind-variants";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer" } },
  },
  defaultVariants: {},
});
