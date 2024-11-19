import { tv } from "tailwind-variants";

export const TableHeaderReactTableVariants = tv({
  slots: {
    base: "sticky top-0 z-[1] bg-background-primary-alt",
    row: "",
    header:
      "group/header relative whitespace-nowrap border-b-1 border-border-primary px-lg py-sm text-left leading-none after:absolute after:right-2 after:top-1/2 after:block after:h-4 after:w-px after:-translate-y-1/2 after:bg-border-primary after:content-[''] last:after:hidden",
    headerInner: "group/header-inner flex items-center gap-md rounded-sm p-sm transition-all",
  },
  variants: {},
  defaultVariants: {},
});
