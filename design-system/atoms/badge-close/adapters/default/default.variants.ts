import { tv } from "tailwind-variants";

export const BadgeCloseDefaultVariants = tv({
  slots: {
    base: "group flex size-6 items-center justify-center rounded-full transition-colors data-[clickable=true]:cursor-pointer",
    closeIcon: "text-inherit",
  },
  variants: {
    color: {
      grey: {
        base: "",
      },
      brand: {
        base: "",
      },
      error: {
        base: "",
      },
      warning: {
        base: "",
      },
      success: {
        base: "",
      },
      inverse: {
        base: "",
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
    variant: {
      flat: {
        base: "",
      },
      outline: {
        base: "",
      },
      solid: {
        base: "",
      },
    },
    size: {
      xxs: {
        base: "size-4",
      },
      xs: {
        base: "size-4",
      },
      sm: {
        base: "size-4",
      },
      md: {
        base: "size-4",
      },
      lg: {
        base: "size-4",
      },
      xl: {
        base: "size-5",
      },
    },
  },
  compoundVariants: [
    // FLAT
    {
      variant: "flat",
      color: "grey",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-grey-backgroundoutline-closexitem-bg_hover",
        closeIcon: "text-components-badge-grey-backgroundoutline-closexitem-fg",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-warning-backgroundoutline-closexitem-bg_hover",
        closeIcon: "text-components-badge-warning-backgroundoutline-closexitem-fg",
      },
    },
    {
      variant: "flat",
      color: "brand",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-brand-backgroundoutline-closexitem-bg_hover",
        closeIcon: "text-components-badge-brand-backgroundoutline-closexitem-fg",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-success-backgroundoutline-closexitem-bg_hover",
        closeIcon: "text-components-badge-success-backgroundoutline-closexitem-fg",
      },
    },
    {
      variant: "flat",
      color: "error",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-error-backgroundoutline-closexitem-bg_hover",
        closeIcon: "text-components-badge-error-backgroundoutline-closexitem-fg",
      },
    },
    // SOLID
    {
      variant: "solid",
      color: "grey",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-grey-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-grey-solid-closexitem-fg",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-warning-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-warning-solid-closexitem-fg",
      },
    },
    {
      variant: "solid",
      color: "brand",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-brand-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-brand-solid-closexitem-fg",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-success-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-success-solid-closexitem-fg",
      },
    },
    {
      variant: "solid",
      color: "error",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-error-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-error-solid-closexitem-fg",
      },
    },
    {
      variant: "solid",
      color: "inverse",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-invert-solid-closexitem-bg_hover",
        closeIcon: "text-components-badge-invert-solid-closexitem-fg",
      },
    },
    // outline
    {
      variant: "outline",
      color: "grey",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-grey-outline-closexitem-bg_hover",
        closeIcon: "text-components-badge-grey-outline-closexitem-fg",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-warning-outline-closexitem-bg_hover",
        closeIcon: "text-components-badge-warning-outline-closexitem-fg",
      },
    },
    {
      variant: "outline",
      color: "brand",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-brand-outline-closexitem-bg_hover",
        closeIcon: "text-components-badge-brand-outline-closexitem-fg",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-success-outline-closexitem-bg_hover",
        closeIcon: "text-components-badge-success-outline-closexitem-fg",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "data-[clickable=true]:hover:bg-components-badge-error-outline-closexitem-bg_hover",
        closeIcon: "text-components-badge-error-outline-closexitem-fg",
      },
    },
  ],
  defaultVariants: {
    shape: "rounded",
    variant: "flat",
    color: "grey",
  },
});
