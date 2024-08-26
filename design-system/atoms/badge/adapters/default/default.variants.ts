import { tv } from "tailwind-variants";

export const BadgeDefaultVariants = tv({
  slots: {
    base: "group block border-1 transition-colors",
    content: "flex flex-row items-center justify-center",
    label: "text-inherit",
    deletableIcon: "text-inherit",
  },
  variants: {
    size: {
      xxs: {
        base: "px-1.5 py-0.5",
        content: "gap-1",
      },
      xs: {
        base: "px-2 py-1.5",
        content: "gap-1",
      },
      sm: {
        base: "px-2 py-2",
        content: "gap-1",
      },
      md: {
        base: "px-3 py-3",
        content: "gap-2",
      },
    },
    isDeletable: {
      true: {},
    },
    color: {
      grey: {
        base: "bg-components-badge-grey-bg border-components-badge-border",
        content: "text-components-badge-grey-typo",
      },
      brand: {
        base: "bg-components-badge-brand-bg border-components-badge-brand-border",
        content: "text-components-badge-brand-typo",
      },
      error: {
        base: "bg-components-badge-error-bg border-components-badge-error-border",
        content: "text-components-badge-error-typo",
      },
      warning: {
        base: "bg-components-badge-badge-warning-bg border-components-badge-badge-warning-border",
        content: "text-components-badge-badge-warning-typo",
      },
      success: {
        base: "bg-components-badge-success-bg border-components-badge-success-border",
        content: "text-components-badge-success-typo",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
      },
      squared: {
        base: "rounded-sm",
      },
    },
  },
  compoundVariants: [
    {
      size: "xxs",
      shape: "rounded",
      isDeletable: false,
      class: {
        base: "px-1.5 py-0.5",
      },
    },
    {
      size: "xxs",
      shape: "squared",
      isDeletable: false,
      class: {
        base: "px-1.5 py-0.5",
      },
    },
    {
      size: "xs",
      shape: "rounded",
      isDeletable: false,
      class: {
        base: "px-2 py-1.5",
      },
    },
    {
      size: "xs",
      shape: "squared",
      isDeletable: false,
      class: {
        base: "px-2 py-1.5",
      },
    },
    {
      size: "sm",
      shape: "rounded",
      isDeletable: false,
      class: {
        base: "px-2 py-2",
      },
    },
    {
      size: "sm",
      shape: "squared",
      isDeletable: false,
      class: {
        base: "px-2 py-2",
      },
    },
    {
      size: "md",
      shape: "rounded",
      isDeletable: false,
      class: {
        base: "px-3 py-3",
      },
    },
    {
      size: "md",
      shape: "squared",
      isDeletable: false,
      class: {
        base: "px-3 py-3",
      },
    },
    {
      size: "xxs",
      shape: "rounded",
      isDeletable: true,
      class: {
        base: "py-0.5 pl-1.5 pr-0.5",
      },
    },
    {
      size: "xxs",
      shape: "squared",
      isDeletable: true,
      class: {
        base: "py-0.5 pl-1.5 pr-0.5",
      },
    },
    {
      size: "xs",
      shape: "rounded",
      isDeletable: true,
      class: {
        base: "py-1.5 pl-2 pr-1",
      },
    },
    {
      size: "xs",
      shape: "squared",
      isDeletable: true,
      base: "py-1.5 pl-2 pr-1",
      class: {
        base: "py-1.5 pl-2 pr-1",
      },
    },
    {
      size: "sm",
      shape: "rounded",
      isDeletable: true,
      class: {
        base: "py-2 pl-2 pr-1.5",
      },
    },
    {
      size: "sm",
      shape: "squared",
      isDeletable: true,
      class: {
        base: "py-2 pl-2 pr-1.5",
      },
    },
    {
      size: "md",
      shape: "rounded",
      isDeletable: true,
      class: {
        base: "px-2 py-3",
      },
    },
    {
      size: "md",
      shape: "squared",
      isDeletable: true,
      class: {
        base: "px-2 py-3",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    shape: "rounded",
    color: "grey",
    isDeletable: false,
  },
});
