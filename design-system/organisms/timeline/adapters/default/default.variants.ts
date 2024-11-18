import { tv } from "tailwind-variants";

export const TimelineDefaultVariants = tv({
  slots: {
    base: "relative z-10 flex w-full flex-col gap-4",
    borderContainer: "absolute left-0 top-0 -z-[1] flex h-full flex-col items-center justify-start",
    border: "w-px flex-1 bg-border-primary",
  },
  variants: {},
  defaultVariants: {},
});
