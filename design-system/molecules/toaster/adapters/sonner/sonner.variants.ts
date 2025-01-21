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
        base: "bg-[var(--shadcn-primary)]",
        icon: "text-[var(--shadcn-primary-foreground)]",
        text: "text-[var(--shadcn-primary-foreground)]",
        closeIcon: "text-[var(--shadcn-primary-foreground)]",
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
