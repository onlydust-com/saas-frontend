import { tv } from "tailwind-variants";

export const TableHeaderReactTableVariants = tv({
  slots: {
    base: "bg-transparent",
    row: "",
    header:
      "relative whitespace-nowrap border-b-1 border-border-primary p-lg text-left leading-none after:absolute after:right-0 after:top-1/2 after:block after:h-4 after:w-px after:-translate-y-1/2 after:bg-border-primary after:content-[''] last:after:hidden",
  },
  variants: {},
  defaultVariants: {},
});
