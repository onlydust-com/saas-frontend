import { tv } from "tailwind-variants";

export const PageHeaderDefaultVariants = tv({
  slots: {
    base: "flex w-full flex-row items-center justify-between gap-1 py-xs pl-sm pr-lg",
    title: "px-md py-xs leading-4",
  },
  variants: {},
  defaultVariants: {},
});
