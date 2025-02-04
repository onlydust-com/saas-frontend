"use client";

import { cn } from "@/shared/utils";

import { BaseLink } from "@/legacy/components/layout/base-link/base-link";
import { Icon } from "@/legacy/components/layout/icon/icon";

import { TLink } from "./link.types";
import { linkVariants } from "./link.variants";

export function Link({ className, children, ...props }: TLink.LinkProps) {
  return (
    <BaseLink className={cn(linkVariants(props), className)} {...props}>
      {({ isExternal }) => (
        <>
          {children}
          {isExternal ? (
            <Icon remixName="ri-external-link-line" className="invisible ml-1 group-hover/link:visible" />
          ) : null}
        </>
      )}
    </BaseLink>
  );
}

Link.Button = function LinkButton({ className, ...props }: TLink.ButtonProps) {
  return <button className={cn(linkVariants(props), className)} {...props} />;
};
