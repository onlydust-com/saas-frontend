import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/design-system/atoms/input";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { cn } from "@/shared/helpers/cn";

import { SelectPort } from "../../select.types";
import { SelectDefaultVariants } from "./default.variants";

export function SelectDefaultAdapter<T = string>({
  classNames,
  name,
  selectedIds,
  onSelect,
  items: _items,
  closeOnSelect,
  controlledAutoComplete,
  onNextPage,
  hasNextPage,
  isDisabled,
  isAutoComplete = false,
  isPopover = true,
  isMultiple = false,
  initialItems,
  onAction,
  disabledAutoOrdering = false,
  ...inputProps
}: SelectPort<T>) {
  const slots = SelectDefaultVariants();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItemPort<T>[]>(initialItems ?? []);

  const items = useMemo(() => {
    if (disabledAutoOrdering) {
      return _items;
    }
    const set = Array.from(new Set([...selectedItem, ..._items]));
    return set.filter((item, index, self) => index === self.findIndex(t => t.id === item.id));
  }, [_items, selectedItem]);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 0 }),
      offset(8),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([role, dismiss, listNav]);

  const selectedValues = useMemo(() => {
    if (selectedIds?.length) {
      return selectedIds
        .map(id => {
          const findInItems = items.find(item => item.id === id) || selectedItem.find(item => item.id === id);
          if (findInItems) {
            return findInItems.label;
          }

          return id;
        })
        .join(", ");
    }
  }, [selectedIds, items]);

  function handleSelect(...args: Parameters<NonNullable<SelectPort<T>["onSelect"]>>) {
    if (closeOnSelect) {
      setOpen(false);
    }

    controlledAutoComplete?.onChange?.("");
    setActiveIndex(null);
    setSelectedItem(items.filter(item => args[0].includes(item.id)));
    onSelect?.(args[0]);
  }

  function onSearchChange(value: string) {
    if (controlledAutoComplete?.onChange) {
      controlledAutoComplete.onChange(value);
    } else {
      setInputValue(value);
    }
  }

  const formatedInputValue = useMemo(() => {
    if (!isAutoComplete) {
      return selectedValues;
    }

    if ((open || !isPopover) && isAutoComplete) {
      if (controlledAutoComplete) {
        return controlledAutoComplete.value;
      }

      return inputValue;
    }

    return selectedValues;
  }, [isAutoComplete, controlledAutoComplete, selectedValues, open, inputValue]);

  const formatedItems = useMemo(() => {
    if (isAutoComplete && !controlledAutoComplete?.onChange) {
      return items.filter(item => {
        return (
          (item.id ? `${item.id}` : "").toLowerCase().includes(inputValue.toLowerCase()) ||
          item.searchValue?.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
    }
    return items;
  }, [isAutoComplete, controlledAutoComplete, inputValue, items]);

  function toggleOpen() {
    setOpen(prev => !prev);
  }

  useEffect(() => {
    setInputValue("");
  }, [open]);

  useEffect(() => {
    if (!selectedItem.length && initialItems) {
      setSelectedItem(initialItems);
    }
  }, [initialItems]);

  if (isDisabled) {
    return (
      <div className={cn(slots.base(), classNames?.base)}>
        <Input
          name={name}
          value={selectedValues}
          isDisabled={isDisabled}
          endIcon={{ component: ChevronDown }}
          canInteract={isAutoComplete}
          {...inputProps}
        />
      </div>
    );
  }

  if (!isPopover) {
    return (
      <div className="flex flex-col gap-md">
        <Input
          name={name}
          endIcon={!isAutoComplete ? { component: ChevronDown } : undefined}
          startIcon={isAutoComplete ? { component: Search } : undefined}
          canInteract={isAutoComplete}
          onChange={e => onSearchChange(e.target.value)}
          {...inputProps}
          value={formatedInputValue}
        />

        <Menu<T>
          items={formatedItems}
          onSelect={handleSelect}
          selectedIds={selectedIds}
          onNextPage={onNextPage}
          hasNextPage={hasNextPage}
          isMultiple={isMultiple}
          onAction={onAction}
        />
      </div>
    );
  }

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <div ref={refs.setReference} {...getReferenceProps()} onClick={toggleOpen} className={"cursor-pointer"}>
        <Input
          name={name}
          value={formatedInputValue}
          endIcon={!isAutoComplete ? { component: ChevronDown } : undefined}
          startIcon={isAutoComplete ? { component: Search } : undefined}
          canInteract={isAutoComplete}
          onChange={e => onSearchChange(e.target.value)}
          {...inputProps}
        />
      </div>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={"z-[9999]"}>
              <Menu<T>
                items={formatedItems}
                onSelect={handleSelect}
                selectedIds={selectedIds}
                onNextPage={onNextPage}
                hasNextPage={hasNextPage}
                isMultiple={isMultiple}
                onAction={onAction}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  );
}
