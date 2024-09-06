import { tv } from "tailwind-variants";

export const InputDefaultVariants = tv({
  slots: {
    container: "flex w-full flex-col gap-sm",
    wrapper: "flex w-full items-center justify-start",
    base: [
      "transition-all",
      "flex w-full items-center justify-start gap-md rounded-md border-1 border-border-primary bg-background-primary-alt effect-box-shadow-xs",
      "data-[hover=true]:border-border-primary-hover hover:border-border-primary-hover",
    ],
    contentWrapper: "flex flex-col items-center justify-center text-foreground-tertiary",
    inputWrapper: "h-full flex-1",
    input: [
      "h-full w-full bg-transparent outline-none",
      "text-typography-secondary placeholder:text-typography-placeholder",
    ],
  },

  variants: {
    size: {
      sm: {
        base: "h-[32px] px-lg",
        input: "text-[0.875rem] leading-[1.25rem]",
      },
      md: {
        base: "h-[40px] px-xl",
        input: "text-[0.875rem] leading-[1.25rem]",
      },
      lg: {
        base: "h-[48px] px-2xl",
        input: "text-[1rem] leading-[1.5rem]",
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
