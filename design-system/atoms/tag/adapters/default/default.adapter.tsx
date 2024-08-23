import { ChevronDown, CircleX } from "lucide-react";
import { ElementType } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TagPort } from "../../tag.types";
import { TagDefaultVariants } from "./default.variants";

export function TagDefaultAdapter<C extends ElementType = "span">({
  classNames,
  startContent,
  as,
  children,
  endContent,
  htmlProps,
  clickable,
  translate,
  labelProps = {},
  hasDropdown,
  ...props
}: TagPort<C>) {
  const { isDeletable, hideText = false, shape, size, color, style } = props;
  const DefaultComponent = isDeletable ? "button" : "span";
  const Component = as || DefaultComponent;
  const slots = TagDefaultVariants({ isDeletable, hideText, shape, size, color, style });

  const showChildren = !hideText && (!!children || !!translate);

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} data-clickable={clickable || hasDropdown}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}

        {showChildren && (
          <Typo size={"xs"} as={"span"} {...labelProps} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || (translate && <Translate {...translate} />)}
          </Typo>
        )}

        {endContent}

        {hasDropdown && (
          <Icon component={ChevronDown} classNames={{ base: cn(slots.dropDownIcon(), classNames?.dropDownIcon) }} />
        )}

        {!!isDeletable && (
          <Icon component={CircleX} classNames={{ base: cn(slots.deletableIcon(), classNames?.deletableIcon) }} />
        )}
      </div>
    </Component>
  );
}
