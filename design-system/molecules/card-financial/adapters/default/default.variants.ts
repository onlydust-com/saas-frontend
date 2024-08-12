import { tv } from "tailwind-variants";

export const CardFinancialDefaultVariants = tv({
  slots: {
    base: "",
    paper: "flex w-full flex-col justify-between gap-2",
  },
  variants: {
    size: {
      m: {
        base: "h-fit w-full",
        paper: "h-fit",
      },
      xl: {
        base: "h-full w-full",
        paper: "h-full",
      },
    },
  },
  defaultVariants: {
    size: "xl",
  },
});
