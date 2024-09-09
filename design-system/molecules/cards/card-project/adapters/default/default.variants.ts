import { tv } from "tailwind-variants";

export const CardProjectDefaultVariants = tv({
  slots: {
    base: "flex gap-2 transition-all",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer outline-none focus-visible:effect-ring-brand-spaced" } },
  },
  defaultVariants: {},
});
