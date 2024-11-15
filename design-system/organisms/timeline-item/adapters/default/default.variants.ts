import { tv } from "tailwind-variants";

export const TimelineItemDefaultVariants = tv({
  slots: {
    base: "flex w-full flex-col",
    header: "flex w-full items-center justify-between gap-1",
    titleContainer: "flex flex-row items-center justify-start gap-3",
    contentContainer: "w-full pl-9 pt-4",
    contentInner: "w-full",
  },
  variants: {},
  defaultVariants: {},
});
