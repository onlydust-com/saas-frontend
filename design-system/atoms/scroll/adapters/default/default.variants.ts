import { tv } from "tailwind-variants";

export const ScrollDefaultVariants = tv({
  slots: {
    base: "size-full scrollbar",
  },
  variants: {
    direction: {
      x: "overflow-x-auto",
      y: "overflow-y-auto",
    },
  },
  defaultVariants: {
    direction: "y",
  },
});
