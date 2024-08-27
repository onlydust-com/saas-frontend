import { RadioGroup as NextRadioGroup } from "@nextui-org/radio";
import { VisuallyHidden, useRadio } from "@nextui-org/react";
import { ElementType, useState } from "react";

import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { RadioGroupPort, RadioPort } from "../../radio-group.types";
import { RadioGroupNextUiVariants } from "./next-ui.variants";

function Radio<V extends string, C extends ElementType = "div">({
  as,
  value,
  classNames,
  componentProps,
  attr = {},
  title,
  isDisabled: isDisabledProp,
  description,
}: RadioPort<V, C>) {
  const InnerComponent = as || "div";
  const { Component, isSelected, getBaseProps, getInputProps, isDisabled: isDisabledGroup } = useRadio({ value });
  const isDisabled = isDisabledProp || isDisabledGroup;
  const slots = RadioGroupNextUiVariants({ isDisabled, isActive: isSelected });
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Component
      {...getBaseProps()}
      data-focus={isFocus}
      className={cn(slots.item(), classNames?.item, { "pointer-events-none": isDisabled })}
      {...attr}
    >
      <InnerComponent {...componentProps} data-focus={isFocus}>
        <VisuallyHidden>
          <input {...getInputProps()} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
        </VisuallyHidden>
        <div className={"flex flex-row gap-md"}>
          <div className={cn(slots.indicator(), classNames?.indicator)}>
            <div
              className={cn(
                slots.indicatorIcon(),
                {
                  "opacity-100": isSelected,
                },
                classNames?.indicatorIcon
              )}
            />
          </div>
          <div className={"flex flex-col"}>
            {!!title && (
              <Typo
                variant={"text"}
                size={"sm"}
                weight={"medium"}
                color={"secondary"}
                canHover={true}
                {...title}
                classNames={{
                  ...(title.classNames || {}),
                  base: cn(
                    {
                      "text-typography-disabled": isDisabled,
                    },
                    title.classNames?.base
                  ),
                }}
              />
            )}
            {!!description && (
              <Typo
                variant={"text"}
                size={"sm"}
                color={"secondary"}
                canHover={true}
                {...description}
                classNames={{
                  ...(description.classNames || {}),
                  base: cn(
                    {
                      "text-typography-disabled": isDisabled,
                    },
                    description.classNames?.base
                  ),
                }}
              />
            )}
          </div>
        </div>
      </InnerComponent>
    </Component>
  );
}

export function RadioGroupNextUiAdapter<V extends string, C extends ElementType = "div">({
  as,
  classNames,
  onChange,
  items,
  value,
  layout,
  ...props
}: RadioGroupPort<V, C>) {
  const Component = as || "div";
  const slots = RadioGroupNextUiVariants({ layout });

  const handleChange = (value: string) => {
    onChange?.(value as V);
  };

  return (
    <NextRadioGroup
      isDisabled={props.isDisabled}
      classNames={{ wrapper: cn(slots.base(), classNames?.base) }}
      onValueChange={handleChange}
      value={value}
    >
      {items.map(item => (
        <Radio key={item.value} as={Component} classNames={classNames} {...props} {...item} />
      ))}
    </NextRadioGroup>
  );
}
