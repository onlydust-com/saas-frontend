import { tv } from "tailwind-variants";

export const AlertDefaultVariants = tv({
  slots: {
    base: "flex gap-4 rounded-lg border p-4 effect-shadow-lg",
    icon: "",
  },
  variants: {
    color: {
      white: {
        base: "border-border-primary bg-background-primary",
        icon: "text-foreground-primary",
      },
      grey: {
        base: "border-border-primary bg-background-secondary",
        icon: "text-foreground-tertiary",
      },
      brand: {
        base: "border-border-brand-secondary bg-background-brand-secondary",
        icon: "text-foreground-brand-primary",
      },
      error: {
        base: "border-border-error-secondary bg-background-error-alt",
        icon: "text-foreground-error",
      },
      warning: {
        base: "border-border-warning-secondary bg-background-warning-alt",
        icon: "text-foreground-warning",
      },
      success: {
        base: "border-border-success-secondary bg-background-success-alt",
        icon: "text-foreground-success",
      },
    },
  },
  defaultVariants: {
    color: "white",
  },
});
