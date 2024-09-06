import { tv } from "tailwind-variants";

export const TagDefaultVariants = tv({
  slots: {
    base: [
      "group block w-fit border-1 border-border-primary bg-background-primary transition-all effect-box-shadow-xs",
      "data-[clickable=true]:cursor-pointer data-[clickable=true]:hover:bg-background-primary-alt-hover",
    ],
    content: "flex flex-row items-center justify-center text-foreground-quaternary",
    label: "text-typography-secondary",
    closeButton: "rounded-[2px] p-0.5 transition-all hover:bg-background-primary-hover",
    closeIcon: "text-foreground-quaternary",
  },
  variants: {
    size: {
      xxs: {
        base: "rounded-xs px-xs py-xxs",
        content: "gap-xs",
      },
      xs: {
        base: "rounded-sm px-md py-xs",
        content: "gap-xs",
      },
      sm: {
        base: "rounded-sm px-md py-sm",
        content: "gap-xs",
      },
      md: {
        base: "rounded-md px-lg py-md",
        content: "gap-md",
      },
    },
    isSelected: {
      true: {
        base: "border-border-active",
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
  },
});
