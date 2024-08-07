import { tv } from "tailwind-variants";

export const LinkDefaultVariants = tv({
  slots: {
    base: "text-text-1 group cursor-pointer text-xs underline underline-offset-1",
  },
  variants: {
    color: {
      default: "",
      inverse: {
        base: "text-text-4",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
