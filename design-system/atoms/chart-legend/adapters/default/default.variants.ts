import { tv } from "tailwind-variants";

export const ChartLegendDefaultVariants = tv({
  slots: {
    base: "group flex items-center justify-center gap-2 overflow-hidden",
    square: "rounded",
    label: "text-text-1",
  },
  variants: {
    colors: {
      "brand-4": {
        square: "bg-brand-4",
      },
      "text-2": {
        square: "bg-text-2",
      },
      "container-3": {
        square: "bg-container-3",
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
    colors: "brand-4",
  },
});
