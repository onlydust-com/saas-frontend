import { ElementType } from "react";

import { BadgeClose } from "@/design-system/atoms/badge-close/variants/badge-close-default";
import { BadgeDefaultVariants } from "@/design-system/atoms/badge/adapters/default/default.variants";
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
  translate,
  labelProps = {},
  closeProps,
  ...props
}: BadgePort<C>) {
  const { isDeletable, shape = "rounded", size = "sm", color } = props;
  const DefaultComponent = isDeletable ? "button" : "span";
  const Component = as || DefaultComponent;

  const slots = BadgeDefaultVariants({ isDeletable, size, color, shape });
  const showChildren = !!children || children === 0 || !!translate;

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <div className={cn(slots.content(), classNames?.content)}>
        {startContent}

        {showChildren && (
          <Typo size={"xs"} as={"span"} {...labelProps} classNames={{ base: cn(slots.label(), classNames?.label) }}>
            {children}
            {translate && <Translate {...translate} />}
          </Typo>
        )}

        {endContent}

        {!!isDeletable && <BadgeClose {...closeProps} color={color} shape={shape} size={size} />}
      </div>
    </Component>
  );
}
