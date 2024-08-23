import { ElementType } from "react";

import { BadgeDefaultVariants } from "@/design-system/atoms/badge/adapters/default/default.variants";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BadgePort } from "../../badge.types";

export function BadgeDefaultAdapter<C extends ElementType = "span">({
  classNames,
  startContent,
  as,
  children,
  endContent,
  htmlProps,
  clickable,
  translate,
  labelProps = {},
  deletableIconProps = {},
  ...props
}: BadgePort<C>) {
  const { isDeletable, shape, size, color } = props;
  const DefaultComponent = isDeletable ? "button" : "span";
  const Component = as || DefaultComponent;

  const slots = BadgeDefaultVariants({ isDeletable, size, color, shape });

  const showChildren = !!children || !!translate;

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} data-clickable={clickable}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}

        {showChildren && (
          <Typo size={"xs"} as={"span"} {...labelProps} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children || (translate && <Translate {...translate} />)}
          </Typo>
        )}

        {endContent}

        {!!isDeletable && (
          <Icon
            name="ri-close-circle-line"
            size={16}
            {...deletableIconProps}
            classNames={{ base: cn(slots.deletableIcon(), classNames?.deletableIcon) }}
          />
        )}
      </div>
    </Component>
  );
}
