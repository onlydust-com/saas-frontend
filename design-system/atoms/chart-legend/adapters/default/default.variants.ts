import { tv } from "tailwind-variants";

export const ChartLegendDefaultVariants = tv({
  slots: {
    base: "group flex items-center justify-center gap-2 overflow-hidden",
    square: "rounded",
    label: "text-text-1",
  },
  variants: {
    color: {
      "chart-1": {
        square: "bg-chart-1",
      },
      "chart-2": {
        square: "bg-chart-2",
      },
      "chart-3": {
        square: "bg-chart-3",
      },
      "chart-4": {
        square: "bg-chart-4",
      },
    },
    size: {
      s: {
        square: "h-2.5 min-h-2.5 w-2.5 min-w-2.5 rounded-sm",
      },
      m: {
        square: "h-3 min-h-3 w-3 min-w-3",
      },
    },
  },
  compoundVariants: [
    {
      size: "m",
    },
    {
      size: "s",
    },
  ],
  defaultVariants: {
    size: "m",
    colors: "chart-1",
  },
});
