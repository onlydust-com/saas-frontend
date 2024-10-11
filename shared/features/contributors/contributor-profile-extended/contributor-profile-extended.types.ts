import { ReactNode } from "react";

import { UserOverviewInterface } from "@/core/domain/user/models/user-overview-model";
import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

import { BadgePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

type HeaderProps = {
  headerLabel?: TypoPort<"span">;
  badgeProps?: BadgePort<"span">;
};

export interface ContributorProfileExtendedProps {
  user: UserPublicInterface | UserOverviewInterface;
  headerProps?: HeaderProps;
  footerContent?: ReactNode;
}
