import { Filter } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { ButtonSecondaryLight } from "@/design-system/atoms/button/variants/button-secondary-light";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableFilterPort } from "../../table-filter.types";
import { TableFilterDefaultVariants } from "./default.variants";

export function TableFilterDefaultAdapter({ children, classNames, filterCount, onClear }: TableFilterPort) {
  const slots = TableFilterDefaultVariants();

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <Tooltip content={<Translate token={"table:tableFilter.title"} />}>
              <ButtonSecondaryLight
                size="l"
                hideText
                startIcon={{ component: Filter }}
                endContent={
                  filterCount ? (
                    <Badge size="s" style="outline">
                      {filterCount}
                    </Badge>
                  ) : null
                }
              />
            </Tooltip>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-3">
            <div className="flex items-center justify-between gap-2">
              <Typo translate={{ token: "table:tableFilter.title" }} />

              <ButtonSecondaryLight onClick={onClear} size="s" translate={{ token: "table:tableFilter.clear" }} />
            </div>

            {children}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
