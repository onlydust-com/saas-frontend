"use client";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { TBadgeListProps } from "@/shared/features/badge-list/badge-list.types";

export function BadgeList({ label, icon, items }: TBadgeListProps) {
  const formattedItems = items.map(item => ({
    ...item,
    icon: { component: icon },
  }));

  if (formattedItems.length < 3) {
    return formattedItems.map((item, index) => <Badge key={index} color="grey" size="xs" {...item} />);
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Badge
              as={"button"}
              color="grey"
              size="xs"
              icon={{ component: icon }}
              endContent={<Icon component={ChevronDown} size={"sm"} />}
            >
              <Typo size={"xs"} color={"tertiary"} translate={{ ...label }} />
            </Badge>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <div className={"grid gap-3"}>
            {items.map((item, index) => {
              if (item) {
                return (
                  <Typo key={index} size={"xs"}>
                    {item.children}
                  </Typo>
                );
              }
              return null;
            })}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
