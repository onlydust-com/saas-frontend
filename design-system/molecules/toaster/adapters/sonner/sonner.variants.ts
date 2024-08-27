import { tv } from "tailwind-variants";

export const ToasterSonnerVariants = tv({
  slots: {
    base: "",
  },
  variants: {
    type: {
      default: {
        base: "bg-container-action",
      },
      error: {
        base: "bg-interactions-error-active",
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});
