import { CircleDot, Clock, Folder, Plus, User } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { HackathonKpiMap, HackathonKpiProps, HackathonKpiType } from "./hackathon-kpi.types";

export function HackathonKpi({
  type,
  nbRegistered = 0,
  nbAvailableIssues = 0,
  totalAvailableIssues = 0,
  nbProjects = 0,
  endsIn = "",
  // TODO handle trends, multiple directions ?
  trend,
  // TODO handle different sizes
}: HackathonKpiProps) {
  const dateKernelPort = bootstrap.dateKernelPort;

  const map: Record<HackathonKpiType, HackathonKpiMap> = {
    [HackathonKpiType.Registered]: {
      title: "hackathon:shared.kpi.registered",
      icon: {
        component: User,
        className: "text-utility-secondary-yellow-500",
      },
      value: nbRegistered,
    },
    [HackathonKpiType.AvailableIssues]: {
      title: "hackathon:shared.kpi.availableIssues",
      icon: {
        component: CircleDot,
        className: "text-utility-secondary-green-500",
      },
      value: `${nbAvailableIssues}/${totalAvailableIssues}`,
    },
    [HackathonKpiType.Projects]: {
      title: "hackathon:shared.kpi.projects",
      icon: {
        component: Folder,
        className: "text-utility-secondary-blue-500",
      },
      value: nbProjects,
    },
    [HackathonKpiType.EndsIn]: {
      title: "hackathon:shared.kpi.endsIn",
      icon: {
        component: Clock,
        className: "text-foreground-tertiary",
      },
      value: endsIn ? dateKernelPort.formatDistanceToNow(new Date(endsIn), { addSuffix: false }) : endsIn,
    },
  };

  return (
    <div>
      <Typo size="xs" color="tertiary" translate={{ token: map[type].title }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <Icon component={map[type].icon.component} classNames={{ base: map[type].icon.className }} />
          <Typo variant="heading" size="xs" weight="medium">
            {map[type].value}
          </Typo>
        </div>

        {trend ? (
          <Badge size="xs" shape="squared" variant="solid" color={"success"} startContent={<Icon component={Plus} />}>
            {trend.value}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
