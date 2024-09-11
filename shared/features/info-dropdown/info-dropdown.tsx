"use client";

import { ChevronDown } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { TInfoDropdownProps } from "@/shared/features/info-dropdown/info-dropdown.types";

export function InfoDropdown({ label, icon, items }: TInfoDropdownProps) {
  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Badge
              as={"button"}
              color="grey"
              size="xs"
              icon={icon}
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
