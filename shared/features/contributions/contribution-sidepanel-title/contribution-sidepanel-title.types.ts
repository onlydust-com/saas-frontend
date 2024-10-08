import { PropsWithChildren } from "react";

import { AnyType } from "@/core/kernel/types";

import { ContributionBadgePort } from "@/design-system/molecules/contribution-badge";

export interface ContributionSidepanelTitleProps extends PropsWithChildren {
  badge?: ContributionBadgePort<AnyType>;
}
