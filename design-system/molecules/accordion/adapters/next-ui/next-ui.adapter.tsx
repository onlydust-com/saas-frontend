import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
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
            base: slots.baseItem(),
            heading: cn(slots.heading(), classNames?.heading),
            trigger: cn(slots.trigger(), classNames?.trigger),
            content: cn(slots.content(), classNames?.content),
          }}
          title={
            <div className="flex items-center gap-md">
              {!!item.startIcon && (
                <Icon
                  {...item.startIcon}
                  classNames={{
                    ...(item.startIcon.classNames || {}),
                    base: cn(slots.startIcon(), classNames?.startIcon, item.startIcon.classNames?.base),
                  }}
                />
              )}

              <Typo
                {...item.titleProps}
                size="xs"
                weight="medium"
                classNames={{ base: cn(slots.label(), classNames?.label) }}
              />

              {!!item.badge && <Badge size={"xxs"} color={"grey"} {...item.badge} />}
            </div>
          }
          indicator={
            <Icon component={ChevronLeft} classNames={{ base: cn(slots.indicator(), classNames?.indicator) }} />
          }
        >
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
