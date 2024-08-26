import { tv } from "tailwind-variants";

export const BadgeCloseDefaultVariants = tv({
  slots: {
    base: "group flex size-6 items-center justify-center rounded-full p-0.5 transition-colors data-[clickable=true]:cursor-pointer",
    closeIcon: "text-inherit",
  },
  variants: {
    color: {
      grey: {
        base: "data-[clickable=true]:hover:bg-components-badge-grey-closexitem-bg-hover",
        closeIcon: "text-components-badge-grey-closexitem-fg",
      },
      brand: {
        base: "data-[clickable=true]:hover:bg-components-badge-brand-closexitem-bg-hover",
        closeIcon: "text-components-badge-brand-closexitem-fg",
      },
      error: {
        base: "data-[clickable=true]:hover:bg-components-badge-error-closexitem-bg-hover",
        closeIcon: "text-components-badge-error-closexitem-fg",
      },
      warning: {
        base: "data-[clickable=true]:hover:bg-components-badge-badge-warning-closexitem-bg-hover",
        closeIcon: "text-components-badge-badge-warning-closexitem-fg",
      },
      success: {
        base: "data-[clickable=true]:hover:bg-components-badge-success-closexitem-bg-hover",
        closeIcon: "text-components-badge-success-closexitem-fg",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
      },
      squared: {
        base: "rounded-xs",
      },
    },
  },
  compoundVariants: [
    {
      color: "grey",
      shape: "rounded",
      base: "data-[clickable=true]:hover:bg-components-badge-grey-closexitem-bg",
      closeIcon: "text-components-badge-grey-closexitem-fg",
    },
    {
      color: "grey",
      shape: "squared",
      base: "data-[clickable=true]:hover:bg-components-badge-grey-closexitem-bg",
      closeIcon: "text-components-badge-grey-closexitem-fg",
    },
    {
      color: "brand",
      shape: "rounded",
      base: "data-[clickable=true]:hover:bg-components-badge-brand-closexitem-bg",
      closeIcon: "text-components-badge-brand-closexitem-fg",
    },
    {
      color: "brand",
      shape: "squared",
      base: "data-[clickable=true]:hover:bg-components-badge-brand-closexitem-bg",
      closeIcon: "text-components-badge-brand-closexitem-fg",
    },
    {
      color: "error",
      shape: "rounded",
      base: "data-[clickable=true]:hover:bg-components-badge-error-closexitem-bg",
      closeIcon: "text-components-badge-error-closexitem-fg",
    },
    {
      color: "error",
      shape: "squared",
      base: "data-[clickable=true]:hover:bg-components-badge-error-closexitem-bg",
      closeIcon: "text-components-badge-error-closexitem-fg",
    },
    {
      color: "warning",
      shape: "rounded",
      base: "data-[clickable=true]:hover:bg-components-badge-warning-closexitem-bg",
      closeIcon: "text-components-badge-badge-warning-closexitem-fg",
    },
    {
      color: "warning",
      shape: "squared",
      base: "data-[clickable=true]:hover:bg-components-badge-warning-closexitem-bg",
      closeIcon: "text-components-badge-badge-warning-closexitem-fg",
    },
    {
      color: "success",
      shape: "rounded",
      base: "data-[clickable=true]:hover:bg-components-badge-success-closexitem-bg",
      closeIcon: "text-components-badge-success-closexitem-fg",
    },
    {
      color: "success",
      shape: "squared",
      base: "data-[clickable=true]:hover:bg-components-badge-success-closexitem-bg",
      closeIcon: "text-components-badge-success-closexitem-fg",
    },
  ],
  defaultVariants: {
    shape: "rounded",
    color: "grey",
  },
});
