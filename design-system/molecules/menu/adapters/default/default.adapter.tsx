import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { MenuItem, MenuItemId } from "@/design-system/molecules/menu-item";
import { MenuDefaultVariants } from "@/design-system/molecules/menu/adapters/default/default.variants";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { cn } from "@/shared/helpers/cn";

import { ListMenuPort } from "../../menu.types";

export function MenuDefaultAdapter<T = string>({
  classNames,
  items,
  selectedIds,
  onSelect,
  onNextPage,
  hasNextPage,
  isLoading,
  onAction,
  isMultiple,
  endContent,
}: ListMenuPort<T>) {
  const slots = MenuDefaultVariants();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<null | number>(null);

  function onSelectItem(value: MenuItemId<T>) {
    let valuesArray = [...(selectedIds || [])];

    if (!isMultiple) {
      if (selectedIds?.includes(value)) {
        valuesArray = [];
      } else {
        valuesArray = [value];
      }
    } else {
      if (selectedIds?.includes(value)) {
        if (valuesArray.length === 1) {
          valuesArray = [];
        } else {
          valuesArray.splice(valuesArray.indexOf(value), 1);
        }
      } else {
        valuesArray.push(value);
      }
    }

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

  function handleItemClick(id: MenuItemId<T>) {
    onAction?.(id);
    onSelectItem(id);
  }

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)} style={minWidth ? { minWidth } : {}}>
        {itemsWithSelection.length ? (
          itemsWithSelection.map(item => (
            <MenuItem<T>
              key={`${item.id}`}
              {...item}
              onClick={id => {
                handleItemClick(id);
                item.onClick?.(id);
              }}
            />
          ))
        ) : (
          <EmptyStateLite />
        )}
        {showMore ? (
          <ShowMore className={"py-2"} onNext={() => onNextPage?.()} loading={isLoading || false} skip={!hasNextPage} />
        ) : undefined}
        {endContent}
      </div>
    </div>
  );
}
