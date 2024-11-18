import { tv } from "tailwind-variants";

export const ButtonDefaultVariants = tv({
  slots: {
    base: "group relative box-border flex h-fit w-fit cursor-pointer items-center justify-center transition-all",
    content: "flex w-full flex-row items-center justify-center",
    startIcon: "transition-colors",
    endIcon: "transition-colors",
    label: "whitespace-nowrap leading-none text-inherit transition-colors",
    spinner: "",
    spinnerCircle: "",
  },

  variants: {
    size: {
      xs: {
        base: "h-[1.5rem] rounded-sm px-md",
        content: "gap-xs",
      },
      sm: {
        base: "h-[2rem] rounded-md px-lg",
        content: "gap-md",
      },
      md: {
        base: "h-[2.5rem] rounded-md px-xl",
        content: "gap-md",
      },
      lg: {
        base: "h-[3rem] rounded-lg px-2xl",
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
    isLoading: {
      true: {
        base: "pointer-events-none cursor-wait",
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
        base: "h-[1.5rem] min-h-[1.5rem] w-[1.5rem] min-w-[1.5rem] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "h-[2.5rem] min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] !px-0",
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
