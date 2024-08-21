import { tv } from "tailwind-variants";

export const CardProjectDefaultVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    clickable: { true: { base: "cursor-pointer" } },
  },
  defaultVariants: {},
});
