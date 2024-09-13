import { tv } from "tailwind-variants";

export const ButtonDefaultVariants = tv({
  slots: {
    base: "group relative box-border flex h-fit w-fit cursor-pointer items-center justify-center overflow-hidden transition-all",
    content: "pointer-events-none flex w-full flex-row items-center justify-center",
    startIcon: "transition-color",
    endIcon: "transition-color",
    label: "transition-color whitespace-nowrap leading-none text-inherit",
  },

  variants: {
    size: {
      xs: {
        base: "h-[24px] rounded-sm px-md",
        content: "gap-xs",
      },
      sm: {
        base: "h-[32px] rounded-md px-lg",
        content: "gap-md",
      },
      md: {
        base: "h-[40px] rounded-md px-xl",
        content: "gap-md",
      },
      lg: {
        base: "h-[48px] rounded-lg px-2xl",
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
        base: "h-[24px] min-h-[24px] w-[24px] min-w-[24px] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "h-[32px] min-h-[32px] w-[32px] min-w-[32px] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "h-[40px] min-h-[40px] w-[40px] min-w-[40px] !px-0",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "h-[48px] min-h-[48px] w-[48px] min-w-[48px] !px-0",
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

// size: {
//   xs: {
//     base: "h-[24px] rounded-sm px-md py-xs",
//       content: "gap-xs",
//   },
//   sm: {
//     base: "h-[32px] rounded-md px-lg py-md",
//       content: "gap-md",
//   },
//   md: {
//     base: "h-[40px] rounded-md px-xl py-2md",
//       content: "gap-md",
//   },
//   lg: {
//     base: "h-[48px] rounded-lg px-2xl py-lg",
//       content: "gap-2md",
//   },
// },
