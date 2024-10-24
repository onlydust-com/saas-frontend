import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { KpiProps } from "./kpi.types";

export function Kpi({ user }: KpiProps) {
  const map = [
    {
      key: "maintainedProjects",
      title: <Translate token={"panels:contributor.kpi.maintainedProjects.title"} />,
      value: user.maintainedProjectCount ?? 0,
    },
    {
      key: "contributedProjects",
      title: <Translate token={"panels:contributor.kpi.contributedProjects.title"} />,
      value: user.projects.length ?? 0,
    },
    {
      key: "rewards",
      title: <Translate token={"panels:contributor.kpi.rewards.title"} />,
      value: user.rewardCount.value ?? 0,
    },
    {
      key: "mergedPullRequests",
      title: <Translate token={"panels:contributor.kpi.mergedPullRequests.title"} />,
      value: user.prCount.value ?? 0,
    },
    {
      key: "inProgressIssues",
      title: <Translate token={"panels:contributor.kpi.inProgressIssues.title"} />,
      value: user.inProgressIssueCount ?? 0,
    },
    {
      key: "pendingApplications",
      title: <Translate token={"panels:contributor.kpi.pendingApplications.title"} />,
      value: user.pendingApplicationCount ?? 0,
    },
  ];

  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:contributor.kpi.title" }} />
      </div>
      <div className="grid grid-cols-3 gap-sm">
        {map.map(({ key, title, value }) => (
          <Paper
            key={key}
            size={"md"}
            background={"primary"}
            border={"primary"}
            classNames={{ base: "flex flex-col gap-md flex-1" }}
          >
            <Typo size={"xs"} color={"secondary"}>
              {title}
            </Typo>
            <Typo variant={"heading"} size={"xs"} color={"secondary"}>
              {value}
            </Typo>
          </Paper>
        ))}
      </div>
    </Paper>
  );
}
