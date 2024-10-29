import { tv } from "tailwind-variants";

export const AccordionNextUiVariants = tv({
  slots: {
    base: "flex flex-col gap-lg p-0",
    baseItem: "group/accordionItem data-[open=true]:rounded-md data-[open=true]:bg-components-accordion-open-bg",
    heading: [
      "transition-background",
      "rounded-none border-b-1 border-border-primary",
      "bg-transparent group-data-[open=true]/accordionItem:bg-components-accordion-open-bg",
      "group-hover/accordionItem:bg-background-primary-alt-hover",
      "group-data-[open=true]/accordionItem:hover:bg-components-accordion-open-bg-hover",
      "group-data-[open=true]/accordionItem:rounded-t-md",
    ],
    trigger: "px-xl py-lg",
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
      },
    },
  },
  defaultVariants: {
    inline: false,
  },
});
