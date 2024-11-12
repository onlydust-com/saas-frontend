import { tv } from "tailwind-variants";

export const TableResizerDefaultVariants = tv({
  slots: {
    base: "absolute right-0 top-1/2 h-4 w-1 -translate-y-1/2 cursor-col-resize touch-none select-none bg-border-primary-hover opacity-0 transition-opacity group-hover/header:opacity-100",
  },
  variants: {
    isResizing: {
      true: {
        base: "opacity-100",
      },
    },
  },
  defaultVariants: {
    isResizing: false,
  },
});
