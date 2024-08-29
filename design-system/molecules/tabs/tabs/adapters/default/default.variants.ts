import { tv } from "tailwind-variants";

export const TabsDefaultVariants = tv({
  slots: {
    base: "",
    item: "",
  },
  variants: {
    variant: {
      underline: { base: "border-b-1 border-border-primary" },
      solid: { base: "rounded-lg bg-background-secondary-alt p-xxs" },
      flat: { base: "" },
      brand: { base: "" },
    },

    layout: {
      horizontal: { base: "flex flex-row items-center justify-start gap-xs" },
      vertical: { base: "flex flex-col gap-xs" },
    },
    isFullWidth: {
      true: { base: "w-full", item: "flex-1" },
      false: { base: "w-fit" },
    },
  },
  defaultVariants: {
    layout: "horizontal",
    variant: "flat",
  },
});
