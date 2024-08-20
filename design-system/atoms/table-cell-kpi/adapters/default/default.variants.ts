import { tv } from "tailwind-variants";

export const TableCellKpiDefaultVariants = tv({
  slots: {
    base: "flex items-center justify-between gap-2 rounded border border-container-stroke-separator p-1",
    icon: "text-text-2",
  },
  variants: {
    inverted: {
      true: "",
    },
    trend: {
      UP: {
        icon: "text-label-green",
      },
      DOWN: {
        icon: "text-label-red",
      },
      STABLE: {
        icon: "text-text-2",
      },
    },
  },
  compoundVariants: [
    {
      inverted: true,
      trend: "UP",
      class: {
        icon: "text-label-red",
      },
    },
    {
      inverted: true,
      trend: "DOWN",
      class: {
        icon: "text-label-green",
      },
    },
  ],
  defaultVariants: {
    inverted: false,
  },
});
