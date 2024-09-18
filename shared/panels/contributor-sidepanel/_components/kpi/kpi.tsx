import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { Translate } from "@/shared/translation/components/translate/translate";

import { KpiProps } from "./kpi.types";

export function Kpi({ user }: KpiProps) {
  const map = [
    {
      key: "lead",
      title: <Translate token={"panels:contributor.kpi.lead.title"} />,
      value: user.statsSummary?.leadedProjectCount ?? 0,
    },
    {
      key: "projects",
      title: <Translate token={"panels:contributor.kpi.projects.title"} />,
      value: user.statsSummary?.contributedProjectCount ?? 0,
    },
    {
      key: "rewards",
      title: <Translate token={"panels:contributor.kpi.rewards.title"} />,
      value: user.statsSummary?.rewardCount ?? 0,
    },
  ];

  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex flex-row items-center justify-between gap-1">
        <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.kpi.title" }} />
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
