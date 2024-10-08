import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { KpiProps } from "./kpi.types";

export function Kpi({ applicants, projectContributors, newContributors }: KpiProps) {
  return (
    <Paper border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size="sm" weight="medium" translate={{ token: "panels:contribution.kpi.title" }} />

      <div className="flex gap-md">
        {applicants ? (
          <Paper
            border="primary"
            background="primary"
            px="md"
            py="md"
            classNames={{ base: "flex flex-col gap-md justify-between" }}
          >
            <Typo size="xs" color="secondary" translate={{ token: "panels:contribution.kpi.items.applicants" }} />
            <Typo variant="heading" size="xs" color="secondary">
              {applicants}
            </Typo>
          </Paper>
        ) : null}

        {projectContributors ? (
          <Paper
            border="primary"
            background="primary"
            px="md"
            py="md"
            classNames={{ base: "flex flex-col gap-md justify-between" }}
          >
            <Typo
              size="xs"
              color="secondary"
              translate={{ token: "panels:contribution.kpi.items.projectContributors" }}
            />
            <Typo variant="heading" size="xs" color="secondary">
              {projectContributors}
            </Typo>
          </Paper>
        ) : null}

        {newContributors ? (
          <Paper
            border="primary"
            background="primary"
            px="md"
            py="md"
            classNames={{ base: "flex flex-col gap-md justify-between" }}
          >
            <Typo size="xs" color="secondary" translate={{ token: "panels:contribution.kpi.items.newContributors" }} />
            <Typo variant="heading" size="xs" color="secondary">
              {newContributors}
            </Typo>
          </Paper>
        ) : null}
      </div>
    </Paper>
  );
}
