import { tv } from "tailwind-variants";

export const TableKpiDefaultVariants = tv({
  slots: {
    base: "flex items-center justify-between gap-2 rounded border border-container-stroke-separator p-1",
    icon: "text-text-2",
  },
  variants: {
    state: {
      positive: {
        icon: "text-label-green",
      },
      negative: {
        icon: "text-label-red",
      },
    },
  },
  defaultVariants: {},
});
