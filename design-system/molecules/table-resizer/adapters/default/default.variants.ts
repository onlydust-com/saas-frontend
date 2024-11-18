import { tv } from "tailwind-variants";

export const TableResizerDefaultVariants = tv({
  slots: {
    base: [
      "absolute right-0 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 cursor-col-resize touch-none select-none opacity-0 transition-opacity hover:opacity-100",
      "after:absolute after:right-1 after:top-1/2 after:block after:h-4 after:w-px after:-translate-y-1/2 after:bg-border-primary-hover after:content-['']",
      "before:absolute before:right-3 before:top-1/2 before:block before:h-4 before:w-px before:-translate-y-1/2 before:bg-border-primary-hover before:content-['']",
    ],
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
