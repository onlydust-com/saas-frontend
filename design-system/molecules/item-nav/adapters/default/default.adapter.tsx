import { SquareArrowOutUpRight } from "lucide-react";

import { Typo } from "@/design-system/atoms/typo";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

import { ItemNavPort } from "../../item-nav.types";
import { ItemNavDefaultVariants } from "./default.variants";

function Content({
  classNames,
  children,
  translate,
  icon: Icon,
  labelProps = {},
  isExternal,
  isDisabled,
  isFolded,
}: ItemNavPort & { isExternal: boolean }) {
  const slots = ItemNavDefaultVariants({
    isDisabled,
  });

  return (
    <div className={"flex w-full items-center justify-start gap-2 overflow-hidden"}>
      <div className={"flex min-h-6 min-w-6 items-center justify-center"}>
        <Icon size={18} />
      </div>
      <div className="flex flex-1 justify-start">
        <Typo
          size={"m"}
          as={"span"}
          {...labelProps}
          translate={translate}
          classNames={{ base: cn(slots.label(), classNames?.label) }}
        >
          {children}
        </Typo>
        {isExternal ? (
          <div className={cn("invisible ml-1 text-inherit group-hover/link:visible", { "!invisible": isFolded })}>
            <SquareArrowOutUpRight size={16} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ItemNavDefaultAdapter({ isFolded, ...props }: ItemNavPort) {
  const { isDisabled, classNames, onClick, linkProps } = props;
  const slots = ItemNavDefaultVariants({
    isDisabled,
  });

  if (linkProps) {
    return (
      <BaseLink {...linkProps} className={cn(slots.base(), classNames?.base)}>
        {({ isExternal }) => <Content {...props} isFolded={isFolded} isExternal={isExternal} />}
      </BaseLink>
    );
  }

  return (
    <button className={cn(slots.base(), classNames?.base)} onClick={onClick} disabled={isDisabled}>
      <Content {...props} isExternal={false} isFolded={isFolded} />
    </button>
  );
}
