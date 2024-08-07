import { tv } from "tailwind-variants";

export const TextareaNextUiVariants = tv({
  slots: {
    base: "flex h-fit flex-col items-start gap-2",
    mainWrapper: "",
    inputWrapper:
      "border-container-stroke-separator text-text-1 group-data-[focus=true]:border-interactions-white-hover group-data-[hover=true]:border-interactions-white-hover rounded-md border !outline-none",
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
});
