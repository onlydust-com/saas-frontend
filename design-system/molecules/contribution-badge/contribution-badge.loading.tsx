import { ComponentProps } from "react";

import { BadgeLoading } from "@/design-system/atoms/badge";

export function ContributionBadgeLoading(props: ComponentProps<typeof BadgeLoading>) {
  return <BadgeLoading {...props} />;
}
