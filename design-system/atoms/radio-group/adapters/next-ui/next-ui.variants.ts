import { tv } from "tailwind-variants";

export const RadioGroupNextUiVariants = tv({
  slots: {
    base: "flex flex-row gap-1",
    item: "group cursor-pointer !select-all",
    indicator:
      "relative h-4 w-4 rounded-full border-2 border-border-primary-alt transition-all group-data-[focus=true]:effect-ring-brand-spaced",
    indicatorIcon:
      "pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground-white opacity-0 transition-opacity",
  },
  variants: {
    layout: {
      vertical: {
        base: "flex-col",
      },
      horizontal: {
        base: "flex-row",
      },
    },
    isDisabled: {
      true: "",
    },
    isActive: {
      true: {
        indicator: [
          "border-background-brand-primary-solid",
          "bg-background-brand-primary-solid",
          "group-data-[hover=true]:border-background-brand-primary-solid-hover hover:border-background-brand-primary-solid-hover",
          "group-data-[hover=true]:bg-background-brand-primary-solid-hover hover:bg-background-brand-primary-solid-hover",
        ],
      },
      false: {
        indicator: ["group-data-[hover=true]:bg-background-primary-alt-hover hover:bg-background-primary-alt-hover"],
      },
    },
  },
  compoundVariants: [
    {
      isActive: true,
      isDisabled: true,
      class: {
        indicator: ["border-foreground-disabled", "bg-foreground-disabled"],
        indicatorIcon: ["bg-background-disabled"],
      },
    },
    {
      isActive: false,
      isDisabled: true,
      class: {
        indicator: ["border-border-disabled", "bg-background-disabled"],
      },
    },
  ],
  defaultVariants: {
    isDisabled: false,
  },
});
