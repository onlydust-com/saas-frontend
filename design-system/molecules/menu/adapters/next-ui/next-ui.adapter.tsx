import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { SharedSelection } from "@nextui-org/system";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { MenuItem } from "@/design-system/molecules/menu-item";

import { ShowMore } from "@/shared/components/show-more/show-more";
import { cn } from "@/shared/helpers/cn";

import { MenuPort } from "../../menu.types";
import { MenuNextUiVariants } from "./next-ui.variants";

export function MenuNextUiAdapter({
  classNames,
  children,
  items,
  closeOnSelect = true,
  onAction,
  selectedIds,
  onSelect,
  placement,
  onNextPage,
  hasNextPage,
  isLoading,
}: MenuPort) {
  const slots = MenuNextUiVariants();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<null | number>(null);

  function onSelectionChange(values: SharedSelection) {
    if (values === "all") {
      return onSelect?.(
        items.map(item => item.id),
        items
      );
    }

    const valuesArray = Array.from(values).map(val => val.toString());

    onSelect?.(
      valuesArray,
      items.filter(item => valuesArray.includes(item.id))
    );
  }

  useLayoutEffect(() => {
    if (triggerRef?.current) {
      setMinWidth(triggerRef?.current?.offsetWidth);
    }
  }, [triggerRef]);

  const itemsWithSelection = useMemo(() => {
    return items.map(item => ({
      ...item,
      isSelected: selectedIds?.includes(item.id),
    }));
  }, [items, selectedIds]);

  const showMore = hasNextPage && !!onNextPage && !isLoading;

  return (
    <Dropdown
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
      placement={placement}
    >
      <DropdownTrigger>
        <div ref={triggerRef}>{children}</div>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={closeOnSelect}
        aria-label="Dynamic Actions"
        hideSelectedIcon={true}
        items={itemsWithSelection}
        className={"gap-0 p-0"}
        selectionMode={"multiple"}
        classNames={{ list: "gap-0" }}
        style={minWidth ? { minWidth } : {}}
        onAction={key => onAction?.(key.toString())}
        selectedKeys={selectedIds}
        onSelectionChange={onSelectionChange}
        bottomContent={
          showMore ? (
            <ShowMore
              className={"py-2"}
              onNext={() => onNextPage?.()}
              loading={isLoading || false}
              skip={!hasNextPage}
            />
          ) : undefined
        }
        emptyContent={"coucou"}
      >
        {item => (
          <DropdownItem key={item.id} className={"!bg-transparent p-0"}>
            <MenuItem {...item} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
