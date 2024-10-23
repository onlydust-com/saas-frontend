import { tv } from "tailwind-variants";

export const ContributionInlineDefaultVariants = tv({
  slots: {
    base: "flex items-center gap-xs",
    label: "",
  },
  variants: {
    truncate: {
      true: {
        label: "line-clamp-1",
      },
    },
  },
  defaultVariants: {},
});
