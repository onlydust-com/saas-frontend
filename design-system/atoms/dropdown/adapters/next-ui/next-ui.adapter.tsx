import { DropdownItem, DropdownMenu, DropdownTrigger, Dropdown as NextUIDropdown } from "@nextui-org/react";
import { ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { DropdownItemType, DropdownPort } from "../../dropdown.types";
import { DropdownNextUiVariants } from "./next-ui.variants";

export function DropdownNextUiAdapter<C extends ElementType = "div">({
  as,
  children,
  items,
  MenuProps,
  classNames,
  ...rest
}: DropdownPort<C>) {
  const Component = as || "div";
  const slots = DropdownNextUiVariants();

  return (
    <NextUIDropdown
      placement="bottom-end"
      {...rest}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        content: cn(slots.content(), classNames?.content),
      }}
      as={Component}
      disableAnimation
    >
      <DropdownTrigger className="z-[1] cursor-pointer">
        <div className="w-fit">{children}</div>
      </DropdownTrigger>
      <DropdownMenu<DropdownItemType>
        {...(MenuProps || {})}
        items={items}
        classNames={{
          base: "p-0 shadow-none",
        }}
      >
        {item => (
          <DropdownItem
            key={item.key}
            {...item}
            className={cn(
              "text-1 data-[hover=true]:bg-card-background-medium data-[hover=true]:text-greyscale-50 rounded-[6px] px-2 py-3",
              {
                "text-orange-500 data-[hover=true]:text-orange-500": item.isWarning,
                "text-github-red data-[hover=true]:text-github-red": item.isError,
              },
              item.className
            )}
          >
            <Typo as="div">{item.children}</Typo>
          </DropdownItem>
        )}
      </DropdownMenu>
    </NextUIDropdown>
  );
}
