import { tv } from "tailwind-variants";

export const CardProjectDefaultVariants = tv({
  slots: {
    base: "flex gap-2",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer" } },
  },
  defaultVariants: {},
});
