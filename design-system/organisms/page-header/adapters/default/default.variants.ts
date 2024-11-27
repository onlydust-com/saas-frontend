import { tv } from "tailwind-variants";

export const PageHeaderDefaultVariants = tv({
  slots: {
    base: "flex w-full flex-row items-center justify-between gap-1 py-lg pb-0 pl-sm pr-lg",
    title: "px-md py-xs leading-4",
  },
  variants: {},
  defaultVariants: {},
});
