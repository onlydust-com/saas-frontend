import { tv } from "tailwind-variants";

export const ToasterSonnerVariants = tv({
  slots: {
    base: "flex min-w-64 justify-between gap-md rounded-md py-md pl-lg pr-md effect-box-shadow-lg",
    icon: "",
    text: "",
    closeIcon: "",
  },
  variants: {
    type: {
      default: {
        base: "bg-background-primary-solid",
        icon: "text-foreground-primary-on-solid",
        text: "text-typography-primary-on-solid",
        closeIcon: "text-foreground-primary-on-solid",
      },
      error: {
        base: "bg-background-error-solid",
        icon: "text-foreground-white",
        text: "text-typography-white",
        closeIcon: "text-foreground-white",
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});
