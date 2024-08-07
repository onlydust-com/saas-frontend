import { ElementType } from "react";

import { BadgeDefaultVariants } from "@/design-system/atoms/badge/adapters/default/default.variants";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { BadgePort } from "../../badge.types";

export function BadgeDefaultAdapter<C extends ElementType = "div">({
  classNames,
  as,
  htmlProps,
  children,
  hideContent,
  ...props
}: BadgePort<C>) {
  const Component = as || "div";
  const { fitContent, size, colors, style } = props;
  const slots = BadgeDefaultVariants({ fitContent, size, colors, style });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {!hideContent && (
        <div className={cn(slots.contentWrapper(), classNames?.contentWrapper)}>
          <Typo as={"div"} size={"xs"} classNames={{ base: cn(slots.content(), classNames?.content) }}>
            {children}
          </Typo>
        </div>
      )}
    </Component>
  );
}
