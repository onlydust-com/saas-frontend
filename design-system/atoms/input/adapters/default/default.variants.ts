import { tv } from "tailwind-variants";

export const InputDefaultVariants = tv({
  slots: {
    container: "flex w-full flex-col gap-sm",
    wrapper: "flex w-full items-stretch justify-start",
    base: [
      "transition-all",
      "flex w-full items-stretch justify-start gap-md rounded-md border-1 border-border-primary bg-background-primary-alt effect-box-shadow-xs",
      "data-[hover=true]:border-border-primary-hover hover:border-border-primary-hover",
    ],
    contentWrapper: "flex flex-col items-start justify-center text-foreground-tertiary",
    inputWrapper: "flex-1",
    input: [
      "h-full w-full bg-transparent outline-none focus:outline-none",
      "text-typography-secondary placeholder:text-typography-placeholder",
    ],
  },

  variants: {
    size: {
      sm: {
        base: "px-lg",
        contentWrapper: "py-md",
        input: "py-md",
      },
      md: {
        base: "px-xl",
        contentWrapper: "py-2md",
        input: "py-2md",
      },
      lg: {
        base: "px-2xl",
        contentWrapper: "py-lg",
        input: "py-lg",
      },
    },

    asOuterElement: {
      true: {
        base: ["rounded-r-none"],
      },
    },

    isFocused: {
      true: {
        base: ["border-border-active", "effect-ring-brand-glued"],
      },
    },

    isError: {
      true: {
        base: "border-border-error-secondary data-[hover=true]:border-border-error-secondary-hover hover:border-border-error-secondary-hover",
      },
    },

    isDisabled: {
      true: {
        base: ["pointer-events-none border-border-disabled bg-background-disabled-alt"],
        contentWrapper: ["text-foreground-disabled"],
        input: ["text-typography-disabled", "placeholder:text-typography-disabled"],
      },
    },
  },

  compoundVariants: [
    {
      isFocused: true,
      isError: true,
      class: {
        base: ["border-border-error-primary", "effect-ring-error-glued"],
      },
    },
  ],

  defaultVariants: {
    size: "md",
    isFocused: false,
  },
});
