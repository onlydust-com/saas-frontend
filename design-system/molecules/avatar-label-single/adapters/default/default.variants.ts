import { tv } from "tailwind-variants";

export const AvatarLabelSingleDefaultVariants = tv({
  slots: {
    base: "flex items-center gap-2",
    title: "line-clamp-1",
    description: "line-clamp-1",
  },
  variants: {
    truncate: {
      true: {
        title: "break-all",
        description: "break-all",
      },
    },
  },
  defaultVariants: {},
});
