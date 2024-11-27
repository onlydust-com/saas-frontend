import { SquareArrowOutUpRight } from "lucide-react";

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
  isActive,
}: ItemNavPort & { isExternal: boolean; isActive: boolean }) {
  const endIcon = isExternal
    ? {
        component: SquareArrowOutUpRight,
        classNames: {
          base: cn("opacity-0 group-hover/link:opacity-100 transition-opacity"),
        },
      }
    : undefined;

  return (
    <TabItem
      as={"div"}
      id={""}
      variant={"flat"}
      startIcon={iconProps}
      endIcon={endIcon}
      classNames={{
        ...classNames?.item,
        base: cn("w-full !transition-all flex-nowrap whitespace-nowrap", classNames?.item?.base),
        startIcon: "min-w-4",
      }}
      isSelected={isActive}
    >
      <div className={cn("flex flex-1 items-center justify-start truncate")}>
        {!!translate && <Translate {...translate} />}
        {children}
      </div>
    </TabItem>
  );
}

export function ItemNavDefaultAdapter({ isActive, ...props }: ItemNavPort) {
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
            <Content {...props} isExternal={isExternal} isActive={active || isActive || false} />
          )}
        </BaseLink>
      </Tooltip>
    );
  }

  return (
    <Tooltip placement={"bottom-start"} content={<Translate token={"ds:itemNav.comingSoon"} />} enabled={isComingSoon}>
      <button className={cn(slots.base(), classNames?.base)} onClick={onClick} disabled={isDisabled || isComingSoon}>
        <Content {...props} isExternal={false} isActive={isActive || false} />
      </button>
    </Tooltip>
  );
}
