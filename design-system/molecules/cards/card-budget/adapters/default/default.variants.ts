import { tv } from "tailwind-variants";

export const CardBudgetDefaultVariants = tv({
  slots: {
    base: "flex gap-2 text-left",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer outline-none focus-visible:effect-ring-brand-spaced" } },
  },
  defaultVariants: {},
});
