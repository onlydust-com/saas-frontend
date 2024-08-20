import { DropdownItem, DropdownMenu, DropdownTrigger, Dropdown as NextUIDropdown } from "@nextui-org/react";
import { SharedSelection } from "@nextui-org/system";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { DropdownItemType, DropdownPort } from "../../dropdown.types";
import { DropdownNextUiVariants } from "./next-ui.variants";

export function DropdownNextUiAdapter({
  children,
  items,
  classNames,
  isMultipleSelection,
  selectedKeys,
  multipleSelectionCountLabel,
  onChange,
}: DropdownPort) {
  const slots = DropdownNextUiVariants();
  function onSelectionChange(values: SharedSelection) {
    if (values === "all") {
      return;
    }

    const valuesArray = Array.from(values).map(val => val.toString());

    onChange?.(
      valuesArray,
      items.filter(item => valuesArray.includes(item.value))
    );
  }

  function buildLabel() {
    if (!selectedKeys || selectedKeys.length === 0) {
      return undefined;
    }

    return selectedKeys?.length > 1
      ? `${selectedKeys?.length} ${multipleSelectionCountLabel || ""}`
      : String(items.find(item => item.value === selectedKeys[0])?.label || selectedKeys[0]);
  }

  return (
    <NextUIDropdown
      placement="bottom-end"
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
    >
      <DropdownTrigger className="z-[1] cursor-pointer">
        <div className="w-fit">{children?.({ label: buildLabel() })}</div>
      </DropdownTrigger>
      <DropdownMenu<DropdownItemType>
        items={items}
        onSelectionChange={onSelectionChange}
        selectionMode={isMultipleSelection ? "multiple" : "single"}
        selectedKeys={new Set(selectedKeys)}
        closeOnSelect={!isMultipleSelection}
        classNames={{
          base: "p-0 shadow-none",
        }}
      >
        {item => (
          <DropdownItem
            {...item}
            key={item.value}
            className={cn(
              "flex flex-row items-center justify-start gap-1 rounded-[6px] px-2 py-3 text-text-1 data-[hover=true]:bg-container-2 data-[selected=true]:bg-container-3 data-[hover=true]:focus:bg-container-2 data-[selected=true]:focus:bg-container-3",
              {
                "text-orange-500 data-[hover=true]:text-orange-500": item.isWarning,
                "text-github-red data-[hover=true]:text-github-red": item.isError,
              },
              item.className
            )}
          >
            <Typo as="div" size={"xs"}>
              {item.label}
            </Typo>
          </DropdownItem>
        )}
      </DropdownMenu>
    </NextUIDropdown>
  );
}
