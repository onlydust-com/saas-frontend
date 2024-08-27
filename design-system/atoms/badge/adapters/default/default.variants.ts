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
        base: "px-sm py-xxs",
        content: "gap-1",
      },
      xs: {
        base: "px-md py-xs",
        content: "gap-1",
      },
      sm: {
        base: "px-md py-sm",
        content: "gap-1",
      },
      md: {
        base: "px-lg py-md",
        content: "gap-2",
      },
    },
    isDeletable: {
      true: {},
    },
    color: {
      grey: {
        base: "border-components-badge-grey-border bg-components-badge-grey-bg",
        content: "text-components-badge-grey-typo",
      },
      brand: {
        base: "border-components-badge-brand-border bg-components-badge-brand-bg",
        content: "text-components-badge-brand-typo",
      },
      error: {
        base: "border-components-badge-error-border bg-components-badge-error-bg",
        content: "text-components-badge-error-typo",
      },
      warning: {
        base: "border-components-badge-badge-warning-border bg-components-badge-badge-warning-bg",
        content: "text-components-badge-badge-warning-typo",
      },
      success: {
        base: "border-components-badge-success-border bg-components-badge-success-bg",
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
      isDeletable: true,
      class: {
        base: "py-0.5 pl-1.5 pr-0.5",
      },
    },
    {
      size: "xs",
      isDeletable: true,
      class: {
        base: "py-1.5 pl-2 pr-1",
      },
    },
    {
      size: "sm",
      isDeletable: true,
      class: {
        base: "py-2 pl-2 pr-1.5",
      },
    },
    {
      size: "md",
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
