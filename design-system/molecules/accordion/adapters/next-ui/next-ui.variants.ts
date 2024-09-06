import { tv } from "tailwind-variants";

export const AccordionNextUiVariants = tv({
  slots: {
    base: "flex flex-col gap-lg p-0",
    baseItem: "group/accordionItem bg-components-accordion-open-bg data-[open=true]:rounded-md",
    heading: [
      "transition-background",
      "rounded-none border-b-1 border-border-primary",
      "bg-transparent group-data-[open=true]/accordionItem:bg-components-accordion-open-bg",
      "group-hover/accordionItem:bg-background-primary-alt-hover",
      "group-data-[open=true]/accordionItem:hover:bg-components-accordion-open-bg-hover",
      "group-data-[open=true]/accordionItem:rounded-t-md",
    ],
    trigger: "px-xl py-lg",
    content: "divide-y divide-border-primary p-0 text-typography-primary *:p-lg",
    indicator: "text-foreground-primary",
    startIcon: "text-foreground-primary",
    label: "text-typography-secondary",
  },
  variants: {},
  defaultVariants: {},
});
