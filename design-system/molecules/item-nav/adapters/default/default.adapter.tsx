import { SquareArrowOutUpRight } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { TabItem } from "@/design-system/molecules/tabs/tab-item";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ItemNavPort } from "../../item-nav.types";
import { ItemNavDefaultVariants } from "./default.variants";

function Content({
  classNames,
  children,
  translate,
  iconProps,
  isExternal,
  isFolded,
  isActive,
}: ItemNavPort & { isExternal: boolean; isActive: boolean }) {
  return (
    <TabItem
      as={"div"}
      id={""}
      variant={"flat"}
      startIcon={iconProps}
      classNames={{
        ...classNames?.item,
        base: cn("w-full justify-start", { "justify-center h-8": isFolded }, classNames?.item?.base),
      }}
      isSelected={isActive}
    >
      {!isFolded && (
        <div className="flex flex-1 items-center justify-start truncate">
          {!!translate && <Translate {...translate} />}
          {children}
          {isExternal ? (
            <Icon
              component={SquareArrowOutUpRight}
              classNames={{
                base: cn("invisible ml-1 group-hover/link:visible", { "!invisible": isFolded }),
              }}
            />
          ) : null}
        </div>
      )}
    </TabItem>
  );
}

export function ItemNavDefaultAdapter({ isFolded, isActive, ...props }: ItemNavPort) {
  const { isDisabled, classNames, onClick, linkProps } = props;
  const slots = ItemNavDefaultVariants({
    isDisabled,
  });

  if (linkProps) {
    return (
      <BaseLink {...linkProps} className={cn(slots.base(), classNames?.base)}>
        {({ isExternal, isActive: active }) => (
          <Content {...props} isFolded={isFolded} isExternal={isExternal} isActive={active || isActive || false} />
        )}
      </BaseLink>
    );
  }

  return (
    <button className={cn(slots.base(), classNames?.base)} onClick={onClick} disabled={isDisabled}>
      <Content {...props} isExternal={false} isActive={isActive || false} isFolded={isFolded} />
    </button>
  );
}
