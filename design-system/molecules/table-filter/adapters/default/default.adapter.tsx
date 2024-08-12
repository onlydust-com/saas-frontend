import { Badge } from "@/design-system/atoms/badge";
import { ButtonSecondaryLight } from "@/design-system/atoms/button/variants/button-secondary-light";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableFilterPort } from "../../table-filter.types";
import { TableFilterDefaultVariants } from "./default.variants";

export function TableFilterDefaultAdapter({ children, classNames, filterCount, onClear }: TableFilterPort) {
  const slots = TableFilterDefaultVariants();

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <ButtonSecondaryLight
              size="l"
              hideText
              startIcon={{ name: "ri-filter-3-line" }}
              endContent={
                filterCount ? (
                  <Badge size="s" style="outline">
                    {filterCount}
                  </Badge>
                ) : null
              }
            />
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-3">
            <div className="flex items-center justify-between gap-2">
              <Typo translate={{ token: "tableFilter:title" }} />

              {onClear ? (
                <ButtonSecondaryLight onClick={onClear} size="s" translate={{ token: "tableFilter:clear" }} />
              ) : null}
            </div>

            {children}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
