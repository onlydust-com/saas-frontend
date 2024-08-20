import { tv } from "tailwind-variants";

export const DateRangePickerNextUiVariants = tv({
  slots: {
    base: "h-fit flex-col items-start gap-2",
    inputWrapper:
      "rounded-md border border-container-stroke-separator px-4 py-3 text-text-1 focus-within:border-interactions-white-hover hover:border-interactions-white-hover focus-within:hover:border-interactions-white-hover",
    innerWrapper: "text-text-3",
    input: "text-sm leading-none text-text-1",
    label: "text-xs text-text-1",
    segment:
      "text-text-3 data-[editable=true]:data-[placeholder=true]:text-text-3 data-[editable=true]:text-text-1 focus:bg-white/20 data-[editable=true]:focus:text-text-1",
    selectorButton: "text-text-1 data-[hover=true]:bg-white/20",
  },
  variants: {
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "bg-interactions-white-disabled",
      },
    },
    isError: {
      true: {
        inputWrapper: "!border-interactions-error-active !text-interactions-error-active",
        input: "!text-interactions-error-active",
        label: "!text-interactions-error-active",
      },
    },
  },
  defaultVariants: {},
});
