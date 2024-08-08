import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { ItemNavDefaultVariants } from "@/design-system/molecules/item-nav/adapters/default/default.variants";
import { ItemNavPort } from "@/design-system/molecules/item-nav/item-nav.types";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ItemNavDefaultAdapter({ classNames, children, translate, ...props }: ItemNavPort) {
  const { isDisabled, isFolded, icon, labelProps = {}, ...linkProps } = props;
  const slots = ItemNavDefaultVariants({
    isDisabled,
  });

  const showChildren = !!children || !!translate;

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal }) => (
        <>
          <Icon size={18} {...icon} />
          {!isFolded && (
            <>
              {showChildren && (
                <Typo
                  size={"m"}
                  as={"span"}
                  {...labelProps}
                  classNames={{ base: cn(slots.label(), classNames?.label) }}
                >
                  {children || <Translate {...translate} />}
                </Typo>
              )}
              {isExternal ? (
                <Icon
                  name="ri-external-link-line"
                  classNames={{
                    base: "invisible ml-1 text-inherit group-hover/link:visible",
                  }}
                />
              ) : null}
            </>
          )}
        </>
      )}
    </BaseLink>
  );
}
