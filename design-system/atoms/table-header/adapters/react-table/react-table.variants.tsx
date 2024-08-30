import { tv } from "tailwind-variants";

export const TableHeaderReactTableVariants = tv({
  slots: {
    base: "bg-transparent",
    row: "",
    header:
      "whitespace-nowrap border-b-1 border-l-1 border-border-primary px-lg py-sm text-left leading-none last:border-l-0",
  },
  variants: {},
  defaultVariants: {},
});
