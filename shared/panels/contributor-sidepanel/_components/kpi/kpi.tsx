import { KpiBlock } from "@/shared/components/kpi/kpi-block/kpi-block";
import { KpiCard } from "@/shared/components/kpi/kpi-card/kpi-card";
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
      value: user.projects?.length ?? 0,
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
    <KpiCard>
      {map.map(kpi => (
        <KpiBlock key={kpi.key} title={kpi.title} value={kpi.value} />
      ))}
    </KpiCard>
  );
}
