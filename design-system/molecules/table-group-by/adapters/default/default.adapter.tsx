import { Layers } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableGroupByPort } from "../../table-group-by.types";
import { TableGroupByDefaultVariants } from "./default.variants";

export function TableGroupByDefaultAdapter({ classNames, onClear, items, value = "", onChange }: TableGroupByPort) {
  const slots = TableGroupByDefaultVariants();

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <Tooltip content={<Translate token={"table:tableGroupBy.title"} />}>
              {/*// TODO BUTTON*/}
              <Button size="lg" hideText startIcon={{ component: Layers }} />
            </Tooltip>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {() => (
          <div className="grid max-w-[360px] gap-3">
            <div className="flex items-center justify-between gap-2">
              <Typo translate={{ token: "table:tableGroupBy.title" }} />
              {/*// TODO BUTTON*/}
              <Button onClick={onClear} size="sm" translate={{ token: "table:tableGroupBy.clear" }} />
            </div>
            {/*// TODO BUTTON*/}
            <RadioButtonGroup variant={"secondary"} value={value} items={items} onChange={onChange} />
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
