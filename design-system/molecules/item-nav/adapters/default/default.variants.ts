import { tv } from "tailwind-variants";

export const ItemNavDefaultVariants = tv({
  slots: {
    base: "flex h-[42px] w-full items-center justify-center rounded-xl border border-transparent p-2 text-text-1 transition-all data-[active=true]:border-container-stroke-separator data-[active=true]:bg-container-stroke-separator hover:border-container-stroke-separator hover:bg-transparent",
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
