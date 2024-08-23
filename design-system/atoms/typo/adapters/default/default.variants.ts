import { tv } from "tailwind-variants";

export const TypoDefaultVariants = tv({
  slots: {
    base: "text-text-1",
  },
  variants: {
    size: {
      xs: { base: "" },
      sm: { base: "" },
      md: { base: "" },
      lg: { base: "" },
      xl: { base: "" },
      "2xl": { base: "" },
    },
    color: {
      primary: { base: "text-primary" },
      "primary-on-brand": { base: "text-primary-on-brand" },
      secondary: { base: "text-secondary" },
      "secondary-hover": { base: "text-secondary-hove" },
      tertiary: { base: "text-tertiary" },
      "tertiary-hover": { base: "text-tertiary-hover" },
      quaternary: { base: "text-quaternary" },
      white: { base: "text-white" },
      disabled: { base: "text-disabled" },
      placeholder: { base: "text-placeholder" },
      error: { base: "text-error" },
      "error-hover": { base: "text-error-hover" },
      warning: { base: "text-warning" },
      "brand-primary": { base: "text-brand-primary" },
      "brand-secondary": { base: "text-brand-secondary" },
      "brand-secondary-alt": { base: "text-brand-secondary-alt" },
      "brand-secondary-alt-hover": { base: "text-brand-secondary-alt-hover" },
      "brand-tertiary": { base: "text-brand-tertiary" },
      success: { base: "text-success" },
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
  ],
  defaultVariants: {
    weight: "regular",
    color: "secondary",
    variant: "text",
    size: "md",
  },
});
