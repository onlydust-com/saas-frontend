import { ElementType } from "react";

import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { cn } from "@/shared/helpers/cn";

import { ContributionInlinePort } from "../../contribution-inline.types";
import { ContributionInlineDefaultVariants } from "./default.variants";

export function ContributionInlineDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  contributionBadgeProps,
  githubTitle,
  truncate = false,
}: ContributionInlinePort<C>) {
  const Component = as || "div";
  const slots = ContributionInlineDefaultVariants({ truncate });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <ContributionBadge {...contributionBadgeProps} />
      <Typo size={"xs"} color={"tertiary"} classNames={{ base: cn(slots.label(), classNames?.label) }}>
        {githubTitle}
      </Typo>
    </Component>
  );
}
