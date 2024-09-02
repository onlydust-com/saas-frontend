import { Columns2 } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumnListPort } from "../../table-column-list.types";
import { TableColumnListDefaultVariants } from "./default.variants";

export function TableColumnListDefaultAdapter({ classNames, items, onChange, onClear }: TableColumnListPort) {
  const slots = TableColumnListDefaultVariants();

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <Tooltip content={<Translate token={"table:tableColumnList.title"} />}>
              <Button variant={"secondary"} size="sm" startIcon={{ component: Columns2 }} iconOnly />
            </Tooltip>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-lg">
            <div className="flex items-center justify-between gap-md">
              <Typo size={"sm"} translate={{ token: "table:tableColumnList.title" }} color={"secondary"} />
              <Button
                onClick={onClear}
                variant={"secondary"}
                size="xs"
                translate={{ token: "table:tableColumnList.clear" }}
              />
            </div>

            <div className="flex flex-col gap-md">
              {items.map(item => (
                <CheckboxButton
                  key={item.id}
                  variant={"secondary"}
                  value={item.value}
                  onChange={value => onChange(item.id, value)}
                >
                  {item.label}
                </CheckboxButton>
              ))}
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
