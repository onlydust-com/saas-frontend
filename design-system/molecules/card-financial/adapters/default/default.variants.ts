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
    color: {
      "chart-1": {
        base: "bg-chart-1",
      },
      "chart-2": {
        base: "bg-chart-2",
      },
      "chart-3": {
        base: "bg-chart-3",
      },
      "chart-4": {
        base: "bg-chart-4",
      },
    },
  },
  defaultVariants: {
    size: "xl",
    color: "chart-1",
  },
});
