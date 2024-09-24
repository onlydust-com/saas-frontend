import { tv } from "tailwind-variants";

export const TableCellKpiDefaultVariants = tv({
  slots: {
    base: "flex items-center justify-between gap-2 whitespace-nowrap",
    icon: "text-components-badge-grey-fg",
  },
  variants: {
    inverted: {
      true: "",
    },
    trend: {
      UP: {
        icon: "text-utility-secondary-green-500",
      },
      DOWN: {
        icon: "text-foreground-error",
      },
      STABLE: {
        icon: "text-utility-secondary-blue-500",
      },
    },
  },
  compoundVariants: [
    {
      inverted: true,
      trend: "UP",
      class: {
        icon: "text-foreground-error",
      },
    },
    {
      inverted: true,
      trend: "DOWN",
      class: {
        icon: "text-utility-secondary-green-500",
      },
    },
  ],
  defaultVariants: {
    inverted: false,
  },
});
