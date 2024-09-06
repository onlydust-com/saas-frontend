import { tv } from "tailwind-variants";

export const MenuItemDefaultVariants = tv({
  slots: {
    base: "group/menuItem w-full cursor-pointer px-1",
    inner: [
      "flex w-full items-center justify-between gap-1 p-md",
      "rounded-xs bg-transparent",
      "transition-all",
      "text-foreground-tertiary transition-all",
      "group-hover/menuItem:bg-background-primary-hover group-hover/menuItem:text-foreground-brand-secondary-hover",
      "group-data-[hover=true]/menuItem:bg-background-primary-hover group-data-[hover=true]/menuItem:text-foreground-brand-secondary-hover",
    ],
    content: [
      "text-typography-secondary transition-all",
      "group-hover/menuItem:text-typography-secondary-hover",
      "group-data-[hover=true]/menuItem:text-typography-secondary-hover",
    ],
  },
  variants: {
    isSelected: {
      true: {
        inner: [
          "text-foreground-brand-primary",
          "bg-background-brand-primary-alt",
          "group-hover/menuItem:bg-background-brand-primary-alt group-hover/menuItem:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/menuItem:bg-background-brand-primary-alt group-data-[hover=true]/menuItem:text-foreground-brand-secondary-hover",
        ],
        content: [
          "font-medium",
          "text-typography-brand-secondary",
          "group-hover/menuItem:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/menuItem:text-typography-brand-secondary-alt-hover",
        ],
      },
    },
    isDisabled: {
      true: {
        base: ["cursor-not-allowed", "pointer-events-none"],
        inner: ["bg-transparent text-foreground-disabled"],
        content: ["text-typography-disabled"],
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: true,
      isSelected: true,
      class: {
        inner: ["bg-background-secondary"],
      },
    },
  ],
  defaultVariants: {
    isDisabled: false,
    isSelected: false,
  },
});
