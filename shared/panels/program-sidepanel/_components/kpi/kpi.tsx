import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

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
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:program.kpi.title" }} />
      </div>
      <div className="flex flex-row gap-2">
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
