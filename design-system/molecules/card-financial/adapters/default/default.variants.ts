import { tv } from "tailwind-variants";

export const CardFinancialDefaultVariants = tv({
  slots: {
    base: "flex h-full w-full flex-col justify-between gap-2",
  },
  variants: {
    size: {
      m: {
        base: "h-fit w-full",
      },
      xl: {
        base: "size-full",
      },
    },
  },
  defaultVariants: {
    size: "xl",
  },
});
