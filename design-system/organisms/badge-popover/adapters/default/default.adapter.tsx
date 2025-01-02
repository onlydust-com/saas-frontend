import { ChevronDown } from "lucide-react";
import { ElementType } from "react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { BadgePopoverPort } from "../../badge-popover.types";
import { BadgePopoverDefaultVariants } from "./default.variants";

export function BadgePopoverDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  title,
  content,
  badgeProps,
  icon,
  items,
  count,
}: BadgePopoverPort<C>) {
  const slots = BadgePopoverDefaultVariants();
  // cn(slots.base(), classNames?.base)

  if (!items?.length) {
    return (
      <Badge as={as} {...htmlProps} size="md" {...(badgeProps ?? {})} icon={icon}>
        {content ?? title}
      </Badge>
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className="cursor-pointer">
            <Badge
              as={as}
              {...htmlProps}
              size="md"
              {...(badgeProps ?? {})}
              icon={icon}
              endContent={<Icon size="md" component={ChevronDown} classNames={{ base: "text-inherit" }} />}
            >
              {content ?? title}
            </Badge>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content className="border-1 border-border-primary bg-background-primary !px-0 !py-2">
        {() => (
          <div className="h-fit w-fit min-w-52 overflow-hidden">
            <div className="border-b-1 border-border-primary px-4 pb-2">
              <Typo size="xs" weight="medium">
                {title}
                {count ? (
                  <Typo as="span" size="xs" weight="medium" color="secondary">
                    &nbsp;{count}
                  </Typo>
                ) : null}
              </Typo>
            </div>
            <ScrollView className={"max-h-[160px] px-4 pt-2"}>
              <div className="flex w-fit flex-col gap-2">
                {items?.map(({ isSelected, onSelect, content }, index) => (
                  <div key={index} onClick={() => onSelect?.()}>
                    {typeof content === "function" ? content({ isSelected, onSelect }) : content}
                  </div>
                ))}
              </div>
            </ScrollView>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
