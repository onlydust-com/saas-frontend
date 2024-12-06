import { tv } from "tailwind-variants";

export const ProjectCategoryCardDefaultVariants = tv({
  slots: {
    base: "flex flex-col items-center gap-3 rounded-lg p-4 transition-colors",
    icon: "text-inherit",
    name: "capitalize",
  },
  variants: {
    color: {
      primary: {
        base: "bg-background-primary hover:bg-background-primary-hover",
      },
      secondary: {
        base: "bg-background-secondary hover:bg-background-secondary-hover",
      },
      brand: {
        base: "hover:bg-background-brand-primary-hover bg-background-brand-primary",
      },
      error: {
        base: "hover:bg-background-error-hover bg-background-error",
      },
      warning: {
        base: "hover:bg-background-warning-hover bg-background-warning",
      },
      success: {
        base: "hover:bg-background-success-hover bg-background-success",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
