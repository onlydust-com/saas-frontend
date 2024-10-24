import { ReactNode } from "react";

import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { BadgePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

type HeaderProps = {
  headerLabel?: TypoPort<"span">;
  badgeProps?: BadgePort<"span">;
};

export interface ContributorProfileExtendedProps {
  user: BiContributorInterface;
  headerProps?: HeaderProps;
  footerContent?: ReactNode;
}
