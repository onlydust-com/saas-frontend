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
      "brand-1": {
        base: "bg-brand-1",
      },
      "brand-2": {
        base: "bg-brand-2",
      },
      "brand-3": {
        base: "bg-brand-3",
      },
      "brand-4": {
        base: "bg-brand-4",
      },
      "container-3": {
        base: "bg-container-3",
      },
    },
  },
  defaultVariants: {
    size: "xl",
    color: "chart-1",
  },
});
