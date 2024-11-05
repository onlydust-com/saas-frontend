import { tv } from "tailwind-variants";

export const TableSortDefaultVariants = tv({
  slots: {
    base: "h-4 w-4 rounded p-xxs text-foreground-quaternary transition-colors hover:bg-background-tertiary hover:text-foreground-secondary-hover",
  },
  variants: {
    isSorted: {
      true: {
        base: "text-foreground-brand-primary hover:bg-background-brand-primary-alt hover:text-foreground-brand-primary-hover",
      },
    },
  },
  defaultVariants: {
    isSorted: false,
  },
});
