import { Icon } from "@/design-system/atoms/icon";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

import { ItemNavPort } from "../../item-nav.types";
import { ItemNavDefaultVariants } from "./default.variants";

export function ItemNavDefaultAdapter({ classNames, ...props }: ItemNavPort) {
  const { isDisabled, isFolded, icon, labelProps = {}, ...linkProps } = props;
  const slots = ItemNavDefaultVariants();

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal }) => (
        <>
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
    </BaseLink>
  );
}
