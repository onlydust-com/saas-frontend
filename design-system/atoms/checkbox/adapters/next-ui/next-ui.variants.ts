import { tv } from "tailwind-variants";

export const CheckboxNextUiVariants = tv({
  slots: {
    base: "flex items-start justify-start gap-2",
    wrapper: "before:rounded-xs after:rounded-xs rounded-xs m-0 box-border h-4 w-4 transition-all",
    icon: "text-text-4",
  },
  variants: {
    variant: {
      primary: {
        wrapper: [
          "before:border-border-primary-alt",
          "after:bg-background-brand-primary-solid group-data-[hover=true]:after:bg-background-brand-primary-solid-hover",
          "group-data-[hover=true]:before:bg-background-primary-alt-hover",
          "effect-shadow-xs",
          "group-data-[focus=true]:effect-ring-brand-spaced focus:effect-ring-brand-spaced",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "pointer-events-none cursor-not-allowed",
        wrapper: "after:border-border-primary-alt before:bg-background-disabled after:bg-transparent",
        icon: "text-foreground-disabled",
      },
    },
    mixed: {
      true: "",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});
