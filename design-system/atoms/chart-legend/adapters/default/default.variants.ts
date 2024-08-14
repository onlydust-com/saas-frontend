import { tv } from "tailwind-variants";

export const ChartLegendDefaultVariants = tv({
  slots: {
    base: "group flex items-center justify-center overflow-hidden rounded",
    square: "flex items-center justify-center text-inherit",
    label: "text-inherit",
  },
  variants: {
    colors: {
      "brand-4": {
        base: "bg-brand-4 text-text-1",
      },
      "text-2": {
        base: "bg-text-2 text-text-1",
      },
      "container-3": {
        base: "bg-container-3 text-text-1",
      },
    },
    size: {
      s: {
        square: "h-4 min-h-4 w-4 min-w-4",
      },
      m: {
        square: "h-6 min-h-6 w-6 min-w-6",
      },
    },
  },
  compoundVariants: [
    {
      size: "m",
      class: {
        base: "px-2",
      },
    },
    {
      size: "s",
      class: {
        base: "px-1",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    colors: "brand-4",
  },
});
