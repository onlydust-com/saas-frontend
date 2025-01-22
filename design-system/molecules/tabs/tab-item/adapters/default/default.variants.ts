import { tv } from "tailwind-variants";

export const TabItemDefaultVariants = tv({
  slots: {
    base: "group/tab flex w-fit flex-row items-center justify-between gap-md transition-background",
    startIcon: "transition-colors",
    endIcon: "transition-colors",
    label: "flex-1 transition-colors",
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
      sm: { base: "px-lg py-sm" },
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
          "focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
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
          "focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
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
          "focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: [
          "group-hover/tab:border-components-badge-brand-backgroundoutline-border group-hover/tab:bg-components-badge-brand-backgroundoutline-bg",
          "group-data-[hover=true]/tab:border-components-badge-brand-backgroundoutline-border group-data-[hover=true]/tab:bg-components-badge-brand-backgroundoutline-bg",
        ],
        badgeContent: [
          "group-hover/tab:text-components-badge-brand-backgroundoutline-typo",
          "group-data-[hover=true]/tab:text-components-badge-brand-backgroundoutline-typo",
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
          "focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
          "text-foreground-brand-secondary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: [
          "border-components-badge-brand-backgroundoutline-border bg-components-badge-brand-backgroundoutline-bg",
        ],
        badgeContent: ["text-components-badge-brand-backgroundoutline-typo"],
      },
    },
    {
      isSelected: false,
      variant: "solid",
      class: {
        base: ["focus-visible:effect-ring-brand-spaced", "data-[focus-visible=true]:effect-ring-brand-spaced"],
        label: [
          "text-typography-secondary",
          "group-hover/tab:text-typography-tertiary-hover",
          "group-data-[hover=true]/tab:text-typography-tertiary-hover",
        ],
        startIcon: [
          "text-foreground-secondary",
          "group-hover/tab:text-foreground-tertiary-hover",
          "group-data-[hover=true]/tab:text-foreground-tertiary-hover",
        ],
        endIcon: [
          "text-foreground-secondary",
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
          "focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:effect-ring-brand-spaced",
        ],
        label: [
          "text-typography-primary",
          "group-hover/tab:text-typography-secondary-hover",
          "group-data-[hover=true]/tab:text-typography-secondary-hover",
        ],
        startIcon: [
          "text-foreground-primary",
          "group-hover/tab:text-foreground-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-secondary-hover",
        ],
        endIcon: [
          "text-foreground-primary",
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
          "focus-visible:rounded-md focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:rounded-md data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
          "text-foreground-tertiary",
          "group-hover/tab:text-foreground-brand-secondary",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary",
        ],
        badge: [
          "group-hover/tab:border-components-badge-brand-backgroundoutline-border group-hover/tab:bg-components-badge-brand-backgroundoutline-bg",
          "group-data-[hover=true]/tab:border-components-badge-brand-backgroundoutline-border group-data-[hover=true]/tab:bg-components-badge-brand-backgroundoutline-bg",
        ],
        badgeContent: [
          "group-hover/tab:text-components-badge-brand-backgroundoutline-typo",
          "group-data-[hover=true]/tab:text-components-badge-brand-backgroundoutline-typo",
        ],
      },
    },
    {
      isSelected: true,
      variant: "underline",
      class: {
        base: [
          "border-b-2 border-border-brand-primary",
          "focus-visible:rounded-md focus-visible:effect-ring-brand-spaced",
          "data-[focus-visible=true]:rounded-md data-[focus-visible=true]:effect-ring-brand-spaced",
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
        endIcon: [
          "text-foreground-brand-secondary",
          "group-hover/tab:text-foreground-brand-secondary-hover",
          "group-data-[hover=true]/tab:text-foreground-brand-secondary-hover",
        ],
        badge: [
          "border-components-badge-brand-backgroundoutline-border bg-components-badge-brand-backgroundoutline-bg",
        ],
        badgeContent: ["text-components-badge-brand-backgroundoutline-typo"],
      },
    },
  ],
  defaultVariants: {
    variant: "flat",
    size: "sm",
  },
});
