import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AccordionMultiplePort } from "../../accordion.types";
import { AccordionNextUiVariants } from "./next-ui.variants";

export function AccordionNextUiAdapter({
  classNames,
  items = [],
  multiple = false,
  defaultSelected,
  controlled,
}: AccordionMultiplePort) {
  const slots = AccordionNextUiVariants();

  return (
    <Accordion
      className={cn(slots.base(), classNames?.base)}
      selectionMode={multiple ? "multiple" : "single"}
      showDivider={false}
      defaultSelectedKeys={defaultSelected}
      selectedKeys={controlled?.selectedKeys}
      onSelectionChange={controlled?.onSelectionChange}
    >
      {items.map(item => (
        <AccordionItem
          key={item.id}
          onKeyDown={e => {
            e.stopPropagation();
          }}
          onClick={e => e.stopPropagation()}
          onFocus={e => e.stopPropagation()}
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
              {!!item.startContent && item.startContent}

              <Typo
                {...item.titleProps}
                size="xs"
                weight="medium"
                classNames={{ base: cn(slots.label(), classNames?.label) }}
              />

              {!!item.badgeProps && <Badge size={"xxs"} color={"grey"} {...item.badgeProps} />}
              {!!item.endTitleContent && item.endTitleContent}
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
