import { tv } from "tailwind-variants";

export const MenuItemNextUiVariants = tv({
  slots: {
    base: "group/menuItem w-full cursor-pointer px-1",
    inner: [
      "flex w-full items-center justify-between gap-1 p-md",
      "rounded-xs bg-transparent",
      "transition-all",
      "text-typography-secondary transition-all",
      "group-hover/menuItem:bg-background-primary-hover group-hover/menuItem:text-typography-secondary-hover",
      "group-data-[hover=true]/menuItem:bg-background-primary-hover group-data-[hover=true]/menuItem:text-typography-secondary-hover",
    ],
    content: "text-inherit",
  },
  variants: {
    isSelected: {
      true: {
        inner: [
          "text-typography-brand-primary",
          "bg-background-brand-primary-alt",
          "group-hover/menuItem:bg-background-brand-primary-alt group-hover/menuItem:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/menuItem:bg-background-brand-primary-alt group-data-[hover=true]/menuItem:text-typography-brand-secondary-alt-hover",
        ],
        content: "font-medium",
      },
    },
    isDisabled: {
      true: {
        base: ["cursor-not-allowed", "pointer-events-none"],
        inner: ["bg-transparent text-typography-disabled"],
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
