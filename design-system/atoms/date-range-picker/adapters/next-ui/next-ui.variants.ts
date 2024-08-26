import { tv } from "tailwind-variants";

export const DateRangePickerNextUiVariants = tv({
  slots: {
    base: "h-fit flex-col items-start gap-2",
    inputWrapper:
      "border-container-stroke-separator text-text-1 focus-within:border-interactions-white-hover group-data-[invalid=true]:border-interactions-error-active hover:border-interactions-white-hover focus-within:hover:border-interactions-white-hover group-data-[invalid=true]:hover:border-interactions-error-active group-data-[invalid=true]:focus-within:hover:border-interactions-error-active rounded-md border px-4 py-3 !transition-colors",
    innerWrapper: "text-text-3 group-data-[invalid=true]:text-interactions-error-active h-4",
    input: "text-text-1 flex items-center text-sm",
    label: "text-text-1 group-data-[invalid=true]:text-interactions-error-active text-xs",
    segment:
      "text-text-3 data-[editable=true]:data-[placeholder=true]:text-text-3 data-[editable=true]:text-text-1 data-[invalid=true]:data-[editable=true]:text-interactions-error-active data-[invalid=true]:text-interactions-error-active data-[invalid=true]:focus:bg-interactions-error-default data-[editable=true]:focus:text-text-1 data-[invalid=true]:data-[editable=true]:focus:text-interactions-error-active my-0 focus:bg-white/20",
    selectorButton:
      "text-text-1 group-data-[invalid=true]:text-interactions-error-active group-data-[invalid=true]:data-[hover=true]:bg-interactions-error-default data-[hover=true]:bg-white/20",
    errorMessage: "text-interactions-error-active text-xs",
  },
  variants: {
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "bg-interactions-white-disabled",
        selectorButton: "text-text-3 !opacity-100",
      },
    },
    isError: {
      true: {
        inputWrapper: "!border-interactions-error-active !text-interactions-error-active",
        innerWrapper: "!text-interactions-error-active",
        segment: "!text-interactions-error-active data-[invalid=true]:focus:bg-interactions-error-default",
        label: "!text-interactions-error-active",
        selectorButton: "!text-interactions-error-active data-[hover=true]:bg-interactions-error-default",
      },
    },
  },
  defaultVariants: {},
});
