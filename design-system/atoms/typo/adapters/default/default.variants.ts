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
      semibold: { base: "font-medium" },
      bold: { base: "font-medium" },
    },
    variant: {
      text: { base: "font-inter" },
      heading: { base: "font-clash" },
    },
  },
  defaultVariants: {
    weight: "regular",
    color: "secondary",
    variant: "text",
    size: "md",
  },
});
