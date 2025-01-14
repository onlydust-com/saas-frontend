import { CircleDot, Clock, Folder, User } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Stat } from "@/shared/components/stat/stat";

import { HackathonStatsProps } from "./hackathon-stats.types";

export function HackathonStats({
  countRegistered = 0,
  countAvailableIssues = 0,
  totalAvailableIssues = 0,
  countProjects = 0,
  endsAt,
}: HackathonStatsProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <div className="grid w-full grid-cols-2 gap-y-xl border-b-1 border-border-primary py-4 tablet:grid-cols-4 tablet:gap-0">
      <div className="border-r-1 border-border-primary px-4">
        <Stat
          label={{ token: "hackathon:shared.stats.registered" }}
          value={Intl.NumberFormat().format(countRegistered)}
          iconProps={{
            component: User,
            classNames: {
              base: "text-utility-secondary-yellow-500",
            },
          }}
        />
      </div>
      <div className="border-border-primary px-4 tablet:border-r-1">
        <Stat
          label={{ token: "hackathon:shared.stats.availableIssues" }}
          value={`${Intl.NumberFormat().format(countAvailableIssues)}/${Intl.NumberFormat().format(totalAvailableIssues)}`}
          iconProps={{
            component: CircleDot,
            classNames: {
              base: "text-utility-secondary-green-500",
            },
          }}
        />
      </div>
      <div className="border-r-1 border-border-primary px-4">
        <Stat
          label={{ token: "hackathon:shared.stats.projects" }}
          value={Intl.NumberFormat().format(countProjects)}
          iconProps={{
            component: Folder,
            classNames: {
              base: "text-utility-secondary-blue-500",
            },
          }}
        />
      </div>
      <div className="px-4">
        <Stat
          label={{ token: "hackathon:shared.stats.endsIn" }}
          value={endsAt ? dateKernelPort.formatDistanceToNow(new Date(endsAt), { addSuffix: false }) : "-"}
          iconProps={{
            component: Clock,
            classNames: {
              base: "text-foreground-tertiary",
            },
          }}
        />
      </div>
    </div>
  );
}
