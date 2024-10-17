import { ReactNode } from "react";

import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

import { BadgePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

type HeaderProps = {
  headerLabel?: TypoPort<"span">;
  badgeProps?: BadgePort<"span">;
};

export interface ContributorProfileCompactProps {
  user: UserPublicInterface;
  headerProps?: HeaderProps;
  footerContent?: ReactNode;
}
