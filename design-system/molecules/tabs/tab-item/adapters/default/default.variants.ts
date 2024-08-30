import { tv } from "tailwind-variants";

export const TabItemDefaultVariants = tv({
  slots: {
    base: "group/tab flex w-fit flex-row items-center justify-center gap-md transition-background",
    startIcon: "transition-colors",
    label: "transition-colors",
    badge: "transition-colors",
    badgeContent: "",
  },
  variants: {
    variant: {
      underline: { base: "" },
      solid: { base: "rounded-md" },
      flat: { base: "rounded-md" },
      brand: { base: "rounded-md" },
    },

    size: {
      sm: { base: "px-lg py-md" },
      md: { base: "px-xl py-2md" },
    },

    isSelected: {
      true: { base: "", label: "font-medium" },
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      variant: "flat",
      class: {
        base: [
          "hover:bg-background-primary-hover",
          "data-[hover=true]:bg-background-primary-hover",
          "focus:effect-ring-brand-spaced",
          "data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-tertiary",
          "group-hover/tab:text-typography-secondary-hover",
          "group-data-[hover=true]/tab:text-typography-secondary-hover",
        ],
        startIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-tertiary-hover",
          "group-data-[hover=true]/tab:text-foreground-tertiary-hover",
        ],
      },
    },
    {
      isSelected: true,
      variant: "flat",
      class: {
        base: [
          "bg-background-active",
          "hover:bg-background-primary-hover",
          "data-[hover=true]:bg-background-primary-hover",
          "focus:effect-ring-brand-spaced",
          "data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-secondary",
          "group-hover/tab:text-typography-secondary-hover",
          "group-data-[hover=true]/tab:text-typography-secondary-hover",
        ],
        startIcon: [
          "text-foreground-secondary",
          "group-hover/tab:text-foreground-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-secondary-hover",
        ],
      },
    },
    {
      isSelected: false,
      variant: "brand",
      class: {
        base: [
          "hover:bg-background-brand-primary-alt",
          "data-[hover=true]:bg-background-brand-primary-alt",
          "focus:effect-ring-brand-spaced",
          "data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-tertiary",
          "group-hover/tab:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/tab:text-typography-brand-secondary-alt-hover",
        ],
        startIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: [
          "group-hover/tab:border-components-badge-brand-border group-hover/tab:bg-components-badge-brand-bg",
          "group-data-[hover=true]/tab:border-components-badge-brand-border group-data-[hover=true]/tab:bg-components-badge-brand-bg",
        ],
        badgeContent: [
          "group-hover/tab:text-components-badge-brand-typo",
          "group-data-[hover=true]/tab:text-components-badge-brand-typo",
        ],
      },
    },
    {
      isSelected: true,
      variant: "brand",
      class: {
        base: [
          "bg-background-brand-primary-alt",
          "hover:bg-background-brand-primary-alt",
          "data-[hover=true]:bg-background-brand-primary-alt",
          "focus:effect-ring-brand-spaced",
          "data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-brand-secondary-alt",
          "group-hover/tab:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/tab:text-typography-brand-secondary-alt-hover",
        ],
        startIcon: [
          "text-foreground-brand-secondary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: ["border-components-badge-brand-border bg-components-badge-brand-bg"],
        badgeContent: ["text-components-badge-brand-typo"],
      },
    },
    {
      isSelected: false,
      variant: "solid",
      class: {
        base: ["focus:effect-ring-brand-spaced", "data-[focus=true]:effect-ring-brand-spaced"],
        label: [
          "text-typography-tertiary",
          "group-hover/tab:text-typography-tertiary-hover",
          "group-data-[hover=true]/tab:text-typography-tertiary-hover",
        ],
        startIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-tertiary-hover",
          "group-data-[hover=true]/tab:text-foreground-tertiary-hover",
        ],
      },
    },
    {
      isSelected: true,
      variant: "solid",
      class: {
        base: [
          "bg-background-primary effect-box-shadow-sm",
          "focus:effect-ring-brand-spaced",
          "data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-secondary",
          "group-hover/tab:text-typography-secondary-hover",
          "group-data-[hover=true]/tab:text-typography-secondary-hover",
        ],
        startIcon: [
          "text-foreground-secondary",
          "group-hover/tab:text-foreground-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-secondary-hover",
        ],
      },
    },
    {
      isSelected: false,
      variant: "underline",
      class: {
        base: [
          "border-b-2 border-transparent",
          "focus:rounded-md focus:effect-ring-brand-spaced",
          "data-[focus=true]:rounded-md data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-tertiary",
          "group-hover/tab:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/tab:text-typography-brand-secondary-alt-hover",
        ],
        startIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-brand-secondary",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary",
        ],
        badge: [
          "group-hover/tab:border-components-badge-brand-border group-hover/tab:bg-components-badge-brand-bg",
          "group-data-[hover=true]/tab:border-components-badge-brand-border group-data-[hover=true]/tab:bg-components-badge-brand-bg",
        ],
        badgeContent: [
          "group-hover/tab:text-components-badge-brand-typo",
          "group-data-[hover=true]/tab:text-components-badge-brand-typo",
        ],
      },
    },
    {
      isSelected: true,
      variant: "underline",
      class: {
        base: [
          "border-b-2 border-border-brand-primary",
          "focus:rounded-md focus:effect-ring-brand-spaced",
          "data-[focus=true]:rounded-md data-[focus=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-brand-secondary-alt",
          "group-hover/tab:text-typography-brand-secondary-alt-hover",
          "group-data-[hover=true]/tab:text-typography-brand-secondary-alt-hover",
        ],
        startIcon: [
          "text-foreground-brand-secondary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: ["border-components-badge-brand-border bg-components-badge-brand-bg"],
        badgeContent: ["text-components-badge-brand-typo"],
      },
    },
  ],
  defaultVariants: {
    variant: "flat",
    size: "sm",
  },
});
