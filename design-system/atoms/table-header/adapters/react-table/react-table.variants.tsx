import { tv } from "tailwind-variants";

export const TableHeaderReactTableVariants = tv({
  slots: {
    base: "bg-transparent",
    row: "",
    header:
      "whitespace-nowrap border-b-1 border-r-1 border-border-primary px-lg py-sm text-left leading-none last:border-r-0",
  },
  variants: {},
  defaultVariants: {},
});
