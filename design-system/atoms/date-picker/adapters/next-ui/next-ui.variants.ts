import { tv } from "tailwind-variants";

export const DatePickerNextUiVariants = tv({
  slots: {
    base: [
      "h-fit flex-col items-start gap-2 !pb-0",
      // TEMPORARY FIX
      "[&>[data-slot=input-wrapper]]:rounded-lg",
      "[&>[data-slot=input-wrapper]]:border",
      "[&>[data-slot=input-wrapper]]:border-border-primary",
      "[&>[data-slot=input-wrapper]]:px-3",
      "[&>[data-slot=input-wrapper]]:py-2",
      "[&>[data-slot=input-wrapper]]:text-[1rem]",
      "[&>[data-slot=input-wrapper]]:leading-[1.5rem]",
      "[&>[data-slot=input-wrapper]]:text-typography-secondary",
      "[&>[data-slot=input-wrapper]]:transition-colors",
      "[&>[data-slot=input-wrapper]]:effect-box-shadow-xs",
      "[&>[data-slot=input-wrapper]]:focus-within:border-border-active",
      "[&>[data-slot=input-wrapper]]:focus-within:effect-ring-brand-glued",
      "[&>[data-slot=input-wrapper]]:group-data-[invalid=true]:border-border-error-secondary",
      "[&>[data-slot=input-wrapper]]:group-data-[invalid=true]:focus-within:border-border-error-primary",
      "[&>[data-slot=input-wrapper]]:group-data-[invalid=true]:focus-within:effect-ring-error-glued",
      "[&>[data-slot=input-wrapper]]:hover:border-border-primary-hover",
      "[&>[data-slot=input-wrapper]]:focus-within:hover:border-border-active",
      "[&>[data-slot=input-wrapper]]:group-data-[invalid=true]:hover:border-border-error-secondary-hover",
    ],
    popoverContent: "effect-shadow-lg rounded-lg bg-background-primary",
    inputWrapper:
      "rounded-lg border border-border-primary px-3 py-2 text-[1rem] leading-[1.5rem] text-typography-secondary transition-colors effect-box-shadow-xs focus-within:border-border-active focus-within:effect-ring-brand-glued group-data-[invalid=true]:border-border-error-secondary group-data-[invalid=true]:focus-within:border-border-error-primary group-data-[invalid=true]:focus-within:effect-ring-error-glued hover:border-border-primary-hover focus-within:hover:border-border-active group-data-[invalid=true]:hover:border-border-error-secondary-hover",
    innerWrapper: "h-4 !text-typography-secondary",
    input: "flex items-center text-[0.875rem] leading-[1.25rem] text-typography-secondary",
    label: "text-[0.875rem] font-medium leading-[1.25rem] !text-typography-secondary",
    segment:
      "my-0 text-typography-placeholder data-[editable=true]:data-[placeholder=true]:text-typography-placeholder data-[editable=true]:text-typography-secondary data-[invalid=true]:data-[editable=true]:text-typography-secondary data-[invalid=true]:text-typography-secondary focus:!bg-components-buttons-button-tertiary-bg-hover focus:effect-box-shadow-xs data-[editable=true]:focus:text-typography-secondary data-[invalid=true]:data-[editable=true]:focus:text-typography-secondary",
    separator: "text-typography-placeholder",
    selectorButton: "absolute left-0 flex w-full justify-end rounded-none !bg-transparent px-3",
    errorMessage: "text-[0.875rem] leading-[1.25rem] text-typography-error",
  },
  variants: {
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "border-border-disabled bg-background-disabled-alt",
        segment: "!text-typography-disabled",
        separator: "text-typography-disabled",
        selectorButton: "!opacity-100",
      },
    },
    isError: {
      true: {
        inputWrapper:
          "border-border-error-secondary focus-within:border-border-error-primary focus-within:effect-ring-error-glued hover:border-border-error-secondary-hover",
        segment: "!text-typography-secondary",
      },
    },
  },
  defaultVariants: {},
});
