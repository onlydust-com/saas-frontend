import { KpiBlock } from "@/shared/components/kpi/kpi-block/kpi-block";
import { KpiCard } from "@/shared/components/kpi/kpi-card/kpi-card";
import { Translate } from "@/shared/translation/components/translate/translate";

import { KpiProps } from "./kpi.types";

export function Kpi({ data }: KpiProps) {
  const map = [
    {
      key: "projects",
      title: <Translate token={"panels:program.kpi.projects.title"} />,
      value: data.projectCount ?? 0,
    },
    {
      key: "contributors",
      title: <Translate token={"panels:program.kpi.contributors.title"} />,
      value: data.contributorCount ?? 0,
    },
    {
      key: "rewards",
      title: <Translate token={"panels:program.kpi.rewards.title"} />,
      value: data.rewardCount ?? 0,
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
