import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AccordionPort } from "../../accordion.types";
import { AccordionNextUiVariants } from "./next-ui.variants";

export function AccordionNextUiAdapter({ classNames, items, multiple = false, defaultSelected }: AccordionPort) {
  const slots = AccordionNextUiVariants();

  return (
    <Accordion
      className={cn(slots.base(), classNames?.base)}
      selectionMode={multiple ? "multiple" : "single"}
      showDivider={false}
      defaultSelectedKeys={defaultSelected}
    >
      {items.map(item => (
        <AccordionItem
          key={item.id}
          classNames={{
            heading: cn(slots.heading(), classNames?.heading),
            trigger: cn(slots.trigger(), classNames?.trigger),
            content: cn(slots.content(), classNames?.content),
          }}
          title={
            <div className="flex items-center gap-2">
              {item.startContent}

              <Typo {...item.titleProps} size="xs" weight="medium" />

              {item.endContent}
            </div>
          }
          indicator={
            <div className={"text-text-1"}>
              <ChevronLeft size={16} />
            </div>
          }
        >
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
