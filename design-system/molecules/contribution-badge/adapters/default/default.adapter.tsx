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
      classNames={{
        ...classNames,
        base: cn("w-fit overflow-visible", classNames?.base),
      }}
    >
      {number}
    </Badge>
  );
}
