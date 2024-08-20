import { tv } from "tailwind-variants";

export const CardProjectDefaultVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    clickable: {
      true: "cursor-pointer",
    },
  },
  defaultVariants: {},
});
