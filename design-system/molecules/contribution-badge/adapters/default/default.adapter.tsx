import { ElementType } from "react";

import { AnyType } from "@/core/kernel/types";

import { Badge, BadgeIconPort } from "@/design-system/atoms/badge";
import { ContributionBadgeMapping } from "@/design-system/molecules/contribution-badge/contribution-badge.constants";

import { cn } from "@/shared/helpers/cn";

import { ContributionBadgePort } from "../../contribution-badge.types";

export function ContributionBadgeDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  size = "xxs",
  shape = "rounded",
  type,
  githubStatus,
  showNumberOnHover,
  number,
}: ContributionBadgePort<C>) {
  const Component = as || "div";

  const badgeProps = ContributionBadgeMapping[type][githubStatus];

  if (!badgeProps) return null;

  const formatedProps: BadgeIconPort<AnyType> = {
    ...badgeProps,
    icon: {
      ...badgeProps.icon,
      size: "xs",
    },
  };

  return (
    <Badge
      as={Component}
      {...htmlProps}
      {...formatedProps}
      size={size}
      shape={shape}
      iconOnly={showNumberOnHover}
      classNames={{
        ...classNames,
        base: cn("w-fit overflow-visible", classNames?.base),
        content: showNumberOnHover ? "gap-0" : undefined,
      }}
    >
      {!showNumberOnHover ? number : null}
      {showNumberOnHover ? (
        <div
          className={cn(
            "w-fit max-w-0 overflow-hidden pl-0 opacity-0 transition-all",
            "group-hover:max-w-[100px] group-hover:pl-1 group-hover:opacity-100"
          )}
        >
          {number}
        </div>
      ) : null}
    </Badge>
  );
}
