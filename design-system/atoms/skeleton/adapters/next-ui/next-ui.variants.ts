import { tv } from "tailwind-variants";

export const SkeletonNextUiVariants = tv({
  slots: {
    base: "w-full",
  },
  variants: {
    shape: {
      square: {
        base: "rounded-lg",
      },
      circle: {
        base: "rounded-full",
      },
    },
    background: {
      glass: { base: "before:!bg-glass-white-gradient !bg-glass-white after:!bg-transparent" },
      primary: { base: "bg-background-primary dark:bg-background-primary" },
      "primary-alt": { base: "bg-background-primary-alt dark:bg-background-primary-alt" },
      "primary-solid": { base: "bg-background-primary-solid dark:bg-background-primary-solid" },
      secondary: { base: "bg-background-secondary dark:bg-background-secondary" },
      "secondary-alt": { base: "bg-background-secondary-alt dark:bg-background-secondary-alt" },
      "secondary-alt-2": { base: "bg-background-secondary-alt-2 dark:bg-background-secondary-alt-2" },
      tertiary: { base: "bg-background-tertiary dark:bg-background-tertiary" },
      quaternary: { base: "bg-background-quaternary dark:bg-background-quaternary" },
      active: { base: "bg-background-active dark:bg-background-active" },
      disabled: { base: "bg-background-disabled dark:bg-background-disabled" },
      "disabled-alt": { base: "bg-background-disabled-alt dark:bg-background-disabled-alt" },
      overlay: { base: "bg-background-overlay dark:bg-background-overlay" },
      error: { base: "bg-background-error dark:bg-background-error" },
      "error-alt": { base: "bg-background-error-alt dark:bg-background-error-alt" },
      "error-solid": { base: "bg-background-error-solid dark:bg-background-error-solid" },
      "brand-primary": { base: "bg-background-brand-primary dark:bg-background-brand-primary" },
      "brand-primary-alt": { base: "bg-background-brand-primary-alt dark:bg-background-brand-primary-alt" },
      "brand-primary-solid": { base: "bg-background-brand-primary-solid dark:bg-background-brand-primary-solid" },
      "brand-secondary": { base: "bg-background-brand-secondary dark:bg-background-brand-secondary" },
      warning: { base: "bg-background-warning dark:bg-background-warning" },
      "warning-alt": { base: "bg-background-warning-alt dark:bg-background-warning-alt" },
      "warning-solid": { base: "bg-background-warning-solid dark:bg-background-warning-solid" },
      success: { base: "bg-background-success dark:bg-background-success" },
      "success-alt": { base: "bg-background-success-alt dark:bg-background-success-alt" },
      "success-solid": { base: "bg-background-success-solid dark:bg-background-success-solid" },
      "primary-hover": { base: "bg-primary-hover dark:bg-primary-hover" },
      "primary-alt-hover": { base: "bg-primary-alt-hover dark:bg-primary-alt-hover" },
      "secondary-hover": { base: "bg-secondary-hover dark:bg-secondary-hover" },
      "tertiary-hover": { base: "bg-tertiary-hover dark:bg-tertiary-hover" },
      "error-solid-hover": { base: "bg-error-solid-hover dark:bg-error-solid-hover" },
      "brand-primary-solid-hover": { base: "bg-brand-primary-solid-hover dark:bg-brand-primary-solid-hover" },
      "warning-solid-hover": { base: "bg-warning-solid-hover dark:bg-warning-solid-hover" },
      "success-solid-hover": { base: "bg-success-solid-hover dark:bg-success-solid-hover" },
    },
  },
  defaultVariants: {
    shape: "square",
    background: "secondary",
  },
});
