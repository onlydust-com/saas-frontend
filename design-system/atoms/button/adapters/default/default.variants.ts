import { tv } from "tailwind-variants";

export const ButtonDefaultVariants = tv({
  slots: {
    base: "group relative box-border flex h-fit w-fit cursor-pointer overflow-hidden bg-red-500 transition-colors",
    content: "flex w-full flex-row items-center justify-center",
    startIcon: "transition-color",
    endIcon: "transition-color",
    label: "transition-color whitespace-nowrap leading-none text-inherit",
  },
  variants: {
    size: {
      xs: {
        base: "py-xs px-md rounded-xs",
        content: "gap-xs",
      },
      sm: {
        base: "py-md px-lg rounded-md",
        content: "gap-md",
      },
      md: {
        base: "py-2md px-xl rounded-md",
        content: "gap-md",
      },
      lg: {
        base: "py-lg px-2xl rounded-lg",
        content: "gap-2md",
      },
    },
    hideText: {
      true: "",
    },
    isDisabled: {
      true: {
        base: "pointer-events-none cursor-not-allowed",
        startIcon: "text-text-3",
        endIcon: "text-text-3",
        content: "text-text-3",
        label: "text-text-3",
      },
    },
    canInteract: {
      false: {
        base: "pointer-events-none",
      },
    },
  },
  compoundVariants: [
    {
      hideText: true,
      size: "xs",
      class: {
        base: "px-xs py-xs",
      },
    },
    {
      hideText: true,
      size: "sm",
      class: {
        base: "px-md py-md",
      },
    },
    {
      hideText: true,
      size: "md",
      class: {
        base: "px-2md py-2md",
      },
    },
    {
      hideText: true,
      size: "sm",
      class: {
        base: "px-1 py-1",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    isDisabled: false,
    isLoading: false,
    canInteract: true,
  },
});
