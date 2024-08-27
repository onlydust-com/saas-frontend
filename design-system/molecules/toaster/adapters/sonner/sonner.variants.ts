import { tv } from "tailwind-variants";

export const ToasterSonnerVariants = tv({
  slots: {
    base: "effect-box-shadow-lg flex gap-2 rounded-lg py-2 pl-3 pr-2",
  },
  variants: {
    type: {
      default: {
        base: "bg-background-primary-solid",
      },
      error: {
        base: "bg-background-error-solid",
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});
