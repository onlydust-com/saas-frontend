import { tv } from "tailwind-variants";

export const InputNextUiVariants = tv({
  slots: {
    base: "h-fit flex-col items-start gap-2",
    mainWrapper: "w-full",
    inputWrapper:
      "border-container-stroke-separator text-text-1 group-data-[focus=true]:border-interactions-white-hover group-data-[hover=true]:border-interactions-white-hover rounded-md border px-4 py-3 !outline-none",
    innerWrapper: "",
    input: "text-text-1 text-sm",
    errorMessage: "",
    label: "text-text-1 text-xs",
    helperWrapper: "",
    description: "",
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
