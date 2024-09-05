import { tv } from "tailwind-variants";

export const TextareaNextUiVariants = tv({
  slots: {
    container: "flex w-full flex-col gap-sm",
    base: "flex h-fit flex-col items-start gap-2",
    inputWrapper: [
      "transition-all",
      "flex w-full items-stretch justify-start gap-md rounded-md border-1 border-border-primary bg-background-primary-alt effect-box-shadow-xs",
      "data-[hover=true]:border-border-primary-hover hover:border-border-primary-hover",
      "px-xl py-lg",
      "group-data-[focus=true]:border-border-active group-data-[focus=true]:effect-ring-brand-glued",
    ],
    innerWrapper: "",
    input: "text-typography-secondary placeholder:text-typography-placeholder",
  },
  variants: {
    isError: {
      true: {
        inputWrapper:
          "border-border-error-secondary data-[hover=true]:border-border-error-secondary-hover hover:border-border-error-secondary-hover",
      },
    },

    isDisabled: {
      true: {
        inputWrapper: ["pointer-events-none border-border-disabled bg-background-disabled-alt"],
        input: ["text-typography-disabled", "placeholder:text-typography-disabled"],
      },
    },
  },
});
