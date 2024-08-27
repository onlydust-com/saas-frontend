import { tv } from "tailwind-variants";

export const ProgressBarNextUiVariants = tv({
  slots: {
    base: "h-2",
    track: "border border-border-primary-alt bg-background-tertiary",
    indicator: "bg-foreground-brand-primary",
  },
  variants: {},
  defaultVariants: {},
});
