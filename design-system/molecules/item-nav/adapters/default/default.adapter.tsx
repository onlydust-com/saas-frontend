import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { ItemNavDefaultVariants } from "@/design-system/molecules/item-nav/adapters/default/default.variants";
import { ItemNavPort } from "@/design-system/molecules/item-nav/item-nav.types";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

function Content({
  classNames,
  children,
  translate,
  icon,
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
      <Icon size={18} {...icon} />
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
          <Icon
            name="ri-external-link-line"
            classNames={{
              base: cn("invisible ml-1 text-inherit group-hover/link:visible", { "!invisible": isFolded }),
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function ItemNavDefaultAdapter({ ...props }: ItemNavPort) {
  const { isDisabled, classNames, onClick, ...linkProps } = props;
  const slots = ItemNavDefaultVariants({
    isDisabled,
  });

  if (onClick) {
    return (
      <button className={cn(slots.base(), classNames?.base)} onClick={onClick} disabled={isDisabled}>
        <Content {...props} isExternal={false} />
      </button>
    );
  }

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal }) => <Content {...props} isExternal={isExternal} />}
    </BaseLink>
  );
}
