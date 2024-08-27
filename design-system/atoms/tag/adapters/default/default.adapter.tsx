import { X } from "lucide-react";
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
  translate,
  labelProps = {},
  onClose,
  onSelect,
  isSelected,
  startIcon,
  ...props
}: TagPort<C>) {
  const { size } = props;
  const Component = as || "span";
  const slots = TagDefaultVariants({ size, isSelected });
  const isSelectable = !!onSelect;
  const showChildren = !!children || !!translate;

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} data-clickable={isSelectable}>
      <div className={cn(slots.content(), classNames?.content)}>
        {!!startIcon && <Icon size={"xxs"} {...startIcon} />}
        {startContent}

        {showChildren && (
          <Typo
            size={"xs"}
            weight={"medium"}
            as={"span"}
            {...labelProps}
            classNames={{ base: cn(slots.label(), classNames?.label) }}
          >
            {children || (translate && <Translate {...translate} />)}
          </Typo>
        )}

        {endContent}

        {!!onClose && (
          <button className={cn(slots.closeButton(), classNames?.closeButton)} onClick={onClose}>
            <Icon component={X} size={"xxs"} classNames={{ base: cn(slots.closeIcon(), classNames?.closeIcon) }} />
          </button>
        )}
      </div>
    </Component>
  );
}
