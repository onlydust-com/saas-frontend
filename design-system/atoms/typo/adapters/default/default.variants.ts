import { tv } from "tailwind-variants";

export const TypoDefaultVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    align: {
      left: { base: "text-left" },
      center: { base: "text-center" },
      right: { base: "text-right" },
    },
    size: {
      xs: { base: "" },
      sm: { base: "" },
      md: { base: "" },
      lg: { base: "" },
      xl: { base: "" },
      "2xl": { base: "" },
    },
    color: {
      primary: { base: "text-typography-primary" },
      "primary-on-brand": { base: "text-typography-primary-on-brand" },
      "primary-on-solid": { base: "text-typography-primary-on-solid" },
      secondary: { base: "text-typography-secondary" },
      "secondary-hover": { base: "text-typography-secondary-hover" },
      tertiary: { base: "text-typography-tertiary" },
      "tertiary-hover": { base: "text-typography-tertiary-hover" },
      quaternary: { base: "text-typography-quaternary" },
      white: { base: "text-typography-white" },
      disabled: { base: "text-typography-disabled" },
      placeholder: { base: "text-typography-placeholder" },
      error: { base: "text-typography-error" },
      "error-hover": { base: "text-typography-error-hover" },
      warning: { base: "text-typography-warning" },
      "brand-primary": { base: "text-typography-brand-primary" },
      "brand-secondary": { base: "text-typography-brand-secondary" },
      "brand-secondary-alt": { base: "text-typography-brand-secondary-alt" },
      "brand-secondary-alt-hover": { base: "text-typography-brand-secondary-alt-hover" },
      "brand-tertiary": { base: "text-typography-brand-tertiary" },
      success: { base: "text-typography-success" },
    },
    weight: {
      regular: { base: "font-normal" },
      medium: { base: "font-medium" },
      semibold: { base: "font-semibold" },
      bold: { base: "font-bold" },
    },
    variant: {
      text: { base: "font-inter" },
      heading: { base: "font-clash" },
    },
    canHover: {
      true: { base: "transition-colors" },
    },
  },
  compoundVariants: [
    // VARIANT TEXT
    {
      variant: "text",
      size: "xs",
      class: {
        base: "text-[0.75rem] leading-[1rem]",
      },
    },
    {
      variant: "text",
      size: "sm",
      class: {
        base: "text-[0.875rem] leading-[1.25rem]",
      },
    },
    {
      variant: "text",
      size: "md",
      class: {
        base: "text-[1rem] leading-[1.5rem]",
      },
    },
    {
      variant: "text",
      size: "lg",
      class: {
        base: "text-[1.125rem] leading-[1.75rem]",
      },
    },
    {
      variant: "text",
      size: "xl",
      class: {
        base: "text-[1.25rem] leading-[1.875rem]",
      },
    },

    // HEADING

    {
      variant: "heading",
      size: "xs",
      class: {
        base: "text-[1.5rem] leading-[32px]",
      },
    },
    {
      variant: "heading",
      size: "sm",
      class: {
        base: "text-[1.875rem] leading-[2rem]",
      },
    },
    {
      variant: "heading",
      size: "md",
      class: {
        base: "text-[2.25rem] leading-[2.75rem]",
      },
    },
    {
      variant: "heading",
      size: "lg",
      class: {
        base: "text-[3rem] leading-[3.75rem]",
      },
    },
    {
      variant: "heading",
      size: "xl",
      class: {
        base: "text-[3.75rem] leading-[4.5rem]",
      },
    },
    {
      variant: "heading",
      size: "2xl",
      class: {
        base: "text-[4.5rem] leading-[5.625rem]",
      },
    },

    // HOVER COLORS

    {
      color: "secondary",
      canHover: true,
      class: {
        base: "group-hover:text-typography-secondary-hover hover:text-typography-secondary-hover",
      },
    },
    {
      color: "tertiary",
      canHover: true,
      class: {
        base: "group-hover:text-typography-tertiary-hover hover:text-typography-tertiary-hover",
      },
    },
    {
      color: "error",
      canHover: true,
      class: {
        base: "group-hover:text-typography-error-hover hover:text-typography-error-hover",
      },
    },
    {
      color: "brand-secondary-alt",
      canHover: true,
      class: {
        base: "group-hover:text-typography-brand-secondary-alt-hover hover:text-typography-brand-secondary-alt-hover",
      },
    },
  ],
  defaultVariants: {
    weight: "regular",
    color: "primary",
    variant: "text",
    size: "md",
  },
});
