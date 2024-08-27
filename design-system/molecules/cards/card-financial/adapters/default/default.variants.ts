import { tv } from "tailwind-variants";

export const CardFinancialDefaultVariants = tv({
  slots: {
    base: "flex h-full w-full flex-col justify-between gap-2 border-1 border-border-primary",
    cta: "rounded-xs p-xs transition-all",
  },
  variants: {
    size: {
      m: {
        base: "h-fit w-full",
      },
      xl: {
        base: "size-full",
      },
    },
    color: {
      grey: {
        base: "bg-background-secondary text-typography-secondary",
        cta: "text-foreground-secondary hover:bg-background-tertiary",
      },
      gradient: {
        base: "text-typography-white component-card-bg-gradient-1",
        cta: "hover:bg-utility-alpha-white-20",
      },
    },
  },
  defaultVariants: {
    size: "xl",
    color: "grey",
  },
});
