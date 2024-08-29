import { tv } from "tailwind-variants";

export const AccordionNextUiVariants = tv({
  slots: {
    base: "flex flex-col gap-4 p-0",
    baseItem: "group/accordionItem bg-components-accordion-open-bg data-[open=true]:rounded-md",
    heading: [
      "transition-background",
      "rounded-none border-b-1 border-border-primary px-xl py-lg",
      "bg-transparent group-data-[open=true]/accordionItem:bg-components-accordion-open-bg",
      "group-hover/accordionItem:bg-background-primary-alt-hover",
      "group-data-[open=true]/accordionItem:hover:bg-components-accordion-open-bg-hover",
      "group-data-[open=true]/accordionItem:rounded-t-md",
    ],
    trigger: "p-0",
    content: "p-lg text-typography-primary",
    indicator: "text-foreground-primary",
    startIcon: "text-foreground-primary",
    label: "text-typography-secondary",
  },
  variants: {},
  defaultVariants: {},
});
