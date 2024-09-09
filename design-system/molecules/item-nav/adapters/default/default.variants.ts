import { tv } from "tailwind-variants";

export const ItemNavDefaultVariants = tv({
  slots: {
    base: "data-[active=true]:border-container-stroke-separator data-[active=true]:bg-container-stroke-separator hover:border-container-stroke-separator flex w-full items-center justify-center rounded-xl border border-transparent transition-all hover:bg-transparent",
    label: "whitespace-nowrap text-inherit",
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
