import { AlertCircle } from "lucide-react";

import { MeApplications } from "@/core/domain/me/models/me-application";

import { Badge } from "@/design-system/atoms/badge";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

import { ApplicationLimitBadgeProps } from "./application-limit-badge.types";

export function ApplicationLimitBadge({ count }: ApplicationLimitBadgeProps) {
  const isOverSubmit = count > MeApplications.getMaxApplicationsOnLiveHackathon();
  if (!isOverSubmit) return null;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          size="xxs"
          color="error"
          icon={{
            component: AlertCircle,
          }}
        >
          Application limit reached
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" className="z-[99999]">
        the user have reached the maximum number of applications ({count} applications) for the current OSS week.
      </TooltipContent>
    </Tooltip>
  );
}
