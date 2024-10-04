import { ComponentPropsWithoutRef, ElementType } from "react";

import { ContributionBadgePort } from "@/design-system/molecules/contribution-badge";

interface Variants {
  truncate: boolean;
}

interface ClassNames {
  base: string;
  label: string;
}

export interface ContributionInlinePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  contributionBadgeProps: ContributionBadgePort<"span">;
  githubTitle: string;
  truncate?: boolean;
}
