import { tv } from "tailwind-variants";

export const SwitchNextUiVariants = tv({
  slots: {
    base: "opacity-1 inline-flex w-full items-start justify-between gap-2",
    wrapper: [
      "m-0 box-border h-4 w-[28px] w-full min-w-[28px] max-w-[28px] bg-background-tertiary p-0.5",
      "group-data-[selected=true]:bg-background-brand-primary-solid",
      "group-data-[hover=true]:bg-background-tertiary-hover",
      "group-data-[selected]:group-data-[hover=true]:bg-background-brand-primary-solid-hover",
      "group-data-[focus-visible=true]:effect-ring-brand-spaced focus-visible:effect-ring-brand-spaced",
    ],
    thumb: [
      "h-3 w-3 max-w-3 effect-box-shadow-sm",
      "group-data-[selected=true]:ml-3 group-data-[selected=true]:bg-foreground-white",
      "group-data-[selected]:group-data-[pressed]:ml-3 group-data-[pressed=true]:w-3",
    ],
    label: "",
    startContent: "",
    endContent: "",
  },
  variants: {
    isDisabled: {
      true: {
        wrapper: "bg-background-disabled group-data-[selected=true]:bg-background-disabled",
        thumb: "bg-components-switch-pill-disabled group-data-[selected=true]:bg-components-switch-pill-disabled",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});
