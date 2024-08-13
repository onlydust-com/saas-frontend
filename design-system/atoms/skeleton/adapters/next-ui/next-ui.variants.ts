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
    container: {
      "1": { base: "bg-container-1" },
      "2": { base: "bg-container-2" },
      "3": { base: "bg-container-3" },
      "4": { base: "bg-container-4" },
      action: { base: "bg-container-action" },
      inverse: { base: "bg-container-inverse" },
      "interactions-black": { base: "bg-interactions-black-default" },
    },
  },
  defaultVariants: {
    shape: "square",
    container: "4",
  },
});
