import { tv } from "tailwind-variants";

export const ItemNavDefaultVariants = tv({
  slots: {
    base: "flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-container-stroke-separator p-2 text-text-1 transition-all hover:bg-transparent data-[active=true]:bg-container-stroke-separator",
    label: "text-inherit",
  },
  variants: {
    isDisabled: {
      true: {
        base: "pointer-events-none opacity-50",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});
