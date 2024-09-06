import { ChevronDown } from "lucide-react";
import { ElementType } from "react";

import { Input } from "@/design-system/atoms/input";
import { Menu } from "@/design-system/molecules/menu";

import { cn } from "@/shared/helpers/cn";

import { SelectPort } from "../../select.types";
import { SelectDefaultVariants } from "./default.variants";

export function SelectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  ...props
}: SelectPort<C>) {
  const Component = as || "div";
  const slots = SelectDefaultVariants();

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <Menu items={[{ id: "item1", label: "Item 1" }]}>
        <Input placeholder={"coucou"} endIcon={{ component: ChevronDown }} canInteract={false} />
      </Menu>
    </Component>
  );
}
