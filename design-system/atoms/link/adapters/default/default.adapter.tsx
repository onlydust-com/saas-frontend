import { Icon } from "@/design-system/atoms/icon";
import { LinkDefaultVariants } from "@/design-system/atoms/link/adapters/default/default.variants";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { cn } from "@/shared/helpers/cn";

import { LinkPort } from "../../link.types";

export function LinkDefaultAdapter({ classNames, children, ...props }: LinkPort) {
  const { color, ...linkProps } = props;
  const slots = LinkDefaultVariants({ color });

  return (
    <BaseLink className={cn(slots.base(), classNames?.base)} {...linkProps}>
      {({ isExternal }) => (
        <>
          {children}
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
