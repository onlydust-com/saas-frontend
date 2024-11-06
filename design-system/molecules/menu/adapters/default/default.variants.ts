import { tv } from "tailwind-variants";

export const MenuDefaultVariants = tv({
  slots: {
    base: "gap-0 p-0",
    content:
      "flex max-h-60 min-w-[160px] flex-col justify-start gap-xs overflow-auto rounded-md border border-border-primary bg-background-primary p-0 py-xs effect-box-shadow-lg scrollbar",
  },
  variants: {},
  defaultVariants: {},
});
