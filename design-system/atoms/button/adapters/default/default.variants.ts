import { tv } from "tailwind-variants";

export const ButtonDefaultVariants = tv({
  slots: {
    base: "group relative box-border flex h-fit w-fit cursor-pointer overflow-hidden transition-all",
    content: "flex w-full flex-row items-center justify-center",
    startIcon: "transition-color",
    endIcon: "transition-color",
    label: "transition-color whitespace-nowrap leading-none text-inherit",
  },
  variants: {
    size: {
      xs: {
        base: "rounded-sm px-md py-xs",
        content: "gap-xs",
      },
      sm: {
        base: "rounded-md px-lg py-md",
        content: "gap-md",
      },
      md: {
        base: "rounded-md px-xl py-2md",
        content: "gap-md",
      },
      lg: {
        base: "rounded-lg px-2xl py-lg",
        content: "gap-2md",
      },
    },
    variant: {
      primary: {
        base: "",
      },
      secondary: {
        base: "",
      },
      tertiary: {
        base: "",
      },
    },
    iconOnly: {
      true: "",
    },
    isDisabled: {
      true: {
        base: "pointer-events-none cursor-not-allowed",
        startIcon: "text-typography-disabled",
        endIcon: "text-typography-disabled",
        content: "text-typography-disabled",
        label: "text-typography-disabled",
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
      iconOnly: true,
      size: "xs",
      class: {
        base: "px-xs py-xs",
      },
    },
    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "px-md py-md",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "!px-2md py-2md",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "px-lg py-lg",
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
