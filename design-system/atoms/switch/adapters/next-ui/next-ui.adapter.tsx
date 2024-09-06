import { Switch as NextUiSwitch } from "@nextui-org/react";

import { SwitchNextUiVariants } from "@/design-system/atoms/switch/adapters/next-ui/next-ui.variants";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { SwitchPort } from "../../switch.types";

export function SwitchNextUiAdapter({ classNames, onChange, label, description, ...props }: SwitchPort) {
  const { isDisabled, isSelected, startContent, endContent } = props;
  const slots = SwitchNextUiVariants({
    isDisabled,
  });

  function handleChange(value: boolean) {
    onChange?.(value);
  }

  return (
    <NextUiSwitch
      classNames={{
        base: cn(slots.base(), classNames?.base),
        label: cn(slots.label(), classNames?.label),
        wrapper: cn(slots.wrapper(), classNames?.wrapper),
        thumb: cn(slots.thumb(), classNames?.thumb),
        startContent: cn(slots.startContent(), classNames?.startContent),
        endContent: cn(slots.endContent(), classNames?.endContent),
      }}
      isDisabled={isDisabled}
      isSelected={isSelected}
      onValueChange={handleChange}
      startContent={startContent}
      endContent={endContent}
    >
      {label || description ? (
        <div className="flex flex-col">
          {label ? <Typo size={"sm"} weight={"medium"} translate={label} /> : null}
          {description ? <Typo size={"sm"} translate={description} /> : null}
        </div>
      ) : null}
    </NextUiSwitch>
  );
}
