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
        base: "px-md py-xs rounded-sm",
        content: "gap-xs",
      },
      sm: {
        base: "px-lg py-md rounded-md",
        content: "gap-md",
      },
      md: {
        base: "px-xl py-2md rounded-md",
        content: "gap-md",
      },
      lg: {
        base: "px-2xl py-lg rounded-lg",
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
