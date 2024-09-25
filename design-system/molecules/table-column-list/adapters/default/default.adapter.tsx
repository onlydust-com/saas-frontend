"use client";

import { Columns2, Search } from "lucide-react";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Menu } from "@/design-system/molecules/menu";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumnListPort } from "../../table-column-list.types";
import { TableColumnListDefaultVariants } from "./default.variants";

export function TableColumnListDefaultAdapter({
  classNames,
  titleProps,
  menuProps,
  popoverProps,
}: TableColumnListPort) {
  const { t } = useTranslation();
  const slots = TableColumnListDefaultVariants();

  const [search, setSearch] = useState("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const { items } = menuProps;
  const menuItems = items.filter(
    item => !item.searchValue || item.searchValue?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover {...popoverProps}>
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

            <Input
              name={"tableColumnListSearch"}
              size={"sm"}
              placeholder={t("common:search")}
              startContent={<Icon component={Search} />}
              value={search}
              onChange={handleSearch}
            />

            <Menu {...menuProps} items={menuItems} classNames={{ content: "max-h-none" }} />
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
