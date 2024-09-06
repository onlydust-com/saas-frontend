import { Checkbox as NextUiCheckbox } from "@nextui-org/react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { CheckboxPort } from "../../checkbox.types";
import { CheckboxNextUiVariants } from "./next-ui.variants";

export function CheckboxNextUiAdapter({
  classNames,
  onChange,
  value,
  label,
  description,
  attr = {},
  ...props
}: CheckboxPort) {
  const { variant = "primary", isDisabled, mixed } = props;
  const slots = CheckboxNextUiVariants({
    variant,
    isDisabled,
  });

  function handleChange(value: boolean) {
    onChange?.(value);
  }

  return (
    <NextUiCheckbox
      classNames={{
        base: cn(slots.base(), classNames?.base),
        wrapper: cn(slots.wrapper(), classNames?.wrapper),
        icon: cn(slots.icon(), classNames?.icon),
      }}
      isDisabled={isDisabled}
      disabled={isDisabled}
      isIndeterminate={mixed}
      isSelected={value}
      onValueChange={handleChange}
      {...attr}
    >
      {label || description ? (
        <div className="flex flex-col">
          {label ? <Typo size={"sm"} weight={"medium"} translate={label} /> : null}
          {description ? <Typo size={"sm"} translate={description} /> : null}
        </div>
      ) : null}
    </NextUiCheckbox>
  );
}
