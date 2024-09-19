import { Columns2 } from "lucide-react";
import { X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumnListPort } from "../../table-column-list.types";
import { TableColumnListDefaultVariants } from "./default.variants";

export function TableColumnListDefaultAdapter({ classNames, titleProps, menuProps }: TableColumnListPort) {
  const slots = TableColumnListDefaultVariants();

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className={cn(slots.base(), classNames?.base)}>
            <Tooltip content={<Translate {...titleProps} />}>
              <Button variant={"secondary"} size="sm" startIcon={{ component: Columns2 }} iconOnly />
            </Tooltip>
          </div>
        )}
      </Popover.Trigger>

      <Popover.Content>
        {({ setIsOpen }) => (
          <div className="grid w-[376px] gap-md">
            <header className={"flex items-center justify-between gap-lg"}>
              <Typo variant={"heading"} size={"xs"} translate={titleProps} />

              <Button
                variant={"tertiary"}
                size={"sm"}
                startIcon={{ component: X }}
                iconOnly
                onClick={() => setIsOpen(false)}
              />
            </header>

            <Menu {...menuProps} classNames={{ content: "max-h-none" }} />
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
