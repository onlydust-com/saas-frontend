import { SquareArrowOutUpRight } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";
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
        base: cn("w-full justify-start !transition-all flex-nowrap whitespace-nowrap", classNames?.item?.base, {
          "!gap-0": isFolded,
        }),
        startIcon: "min-w-4",
      }}
      isSelected={isActive}
    >
      <div className={cn("flex flex-1 items-center justify-start truncate transition-all", { "opacity-0": isFolded })}>
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
    </TabItem>
  );
}

export function ItemNavDefaultAdapter({ isFolded, isActive, ...props }: ItemNavPort) {
  const { isDisabled, classNames, onClick, linkProps, isComingSoon = false } = props;
  const slots = ItemNavDefaultVariants({
    isDisabled: isDisabled || isComingSoon,
  });

  if (linkProps) {
    return (
      <Tooltip
        placement={"bottom-start"}
        content={<Translate token={"ds:itemNav.comingSoon"} />}
        enabled={isComingSoon}
      >
        <BaseLink {...linkProps} className={cn(slots.base(), classNames?.base)}>
          {({ isExternal, isActive: active }) => (
            <Content {...props} isFolded={isFolded} isExternal={isExternal} isActive={active || isActive || false} />
          )}
        </BaseLink>
      </Tooltip>
    );
  }

  return (
    <Tooltip placement={"bottom-start"} content={<Translate token={"ds:itemNav.comingSoon"} />} enabled={isComingSoon}>
      <button className={cn(slots.base(), classNames?.base)} onClick={onClick} disabled={isDisabled || isComingSoon}>
        <Content {...props} isExternal={false} isActive={isActive || false} isFolded={isFolded} />
      </button>
    </Tooltip>
  );
}
