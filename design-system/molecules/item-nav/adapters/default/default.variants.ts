import { tv } from "tailwind-variants";

export const ItemNavDefaultVariants = tv({
  slots: {
    base: "flex h-10 w-full items-center gap-2 rounded-xl border border-container-stroke-separator bg-container-stroke-separator p-2 text-text-1 transition-all hover:bg-transparent",
    label: "text-inherit",
  },
  variants: {
    isDisabled: {
      true: {
        base: "pointer-events-none border-none bg-transparent hover:border hover:border-container-stroke-separator",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});
