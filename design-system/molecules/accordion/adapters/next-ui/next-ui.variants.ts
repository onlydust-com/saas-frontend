import { tv } from "tailwind-variants";

export const AccordionNextUiVariants = tv({
  slots: {
    base: "flex flex-col gap-lg p-0",
    baseItem: "group/accordionItem rounded-md data-[open=true]:bg-components-accordion-open-bg",
    heading: [
      "relative transition-all",
      "rounded-md",
      "bg-transparent group-data-[open=true]/accordionItem:bg-components-accordion-open-bg",
      "group-hover/accordionItem:bg-background-primary-alt-hover",
      "group-data-[open=true]/accordionItem:hover:bg-components-accordion-open-bg-hover",
      "group-data-[open=true]/accordionItem:rounded-b-none",
      "after:absolute after:h-px after:w-full after:bg-border-primary after:transition-opacity hover:after:opacity-0",
    ],
    trigger: "",
    content: "",
    indicator: "text-foreground-primary",
    startIcon: "text-foreground-primary",
    label: "text-typography-secondary",
  },
  variants: {
    inline: {
      true: {
        base: "",
        baseItem: "!bg-transparent",
        heading: ["border-0", "!bg-transparent", "rounded-0"],
        trigger: "px-px py-px",
        content: "p-0",
        indicator: "",
        startIcon: "",
        label: "",
      },
      false: {
        content: "divide-y divide-border-primary p-0 text-typography-primary *:p-lg",
        trigger: "px-xl py-lg",
      },
    },
  },
  defaultVariants: {
    inline: false,
  },
});
