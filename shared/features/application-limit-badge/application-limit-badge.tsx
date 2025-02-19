import { AlertCircle } from "lucide-react";

import { MeApplications } from "@/core/domain/me/models/me-application";

import { Badge } from "@/design-system/atoms/badge";

import { ApplicationLimitBadgeProps } from "./application-limit-badge.types";

export function ApplicationLimitBadge({ count }: ApplicationLimitBadgeProps) {
  const isOverSubmit = count > MeApplications.getMaxApplicationsOnLiveHackathon();
  if (!isOverSubmit) return null;

  return (
    <Badge
      size="xxs"
      color="error"
      icon={{
        component: AlertCircle,
      }}
    >
      {count} applications
    </Badge>
  );
}
