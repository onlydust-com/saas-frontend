import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { KpiProps } from "./kpi.types";

export function Kpi({ applicants, projectContributors, newContributors }: KpiProps) {
  const applicantsFormattedValue = Intl.NumberFormat().format(applicants || 0);
  const projectContributorsFormattedValue = Intl.NumberFormat().format(projectContributors || 0);
  const newContributorsFormattedValue = Intl.NumberFormat().format(newContributors || 0);

  return (
    <Paper border="primary" classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size="sm" weight="medium" translate={{ token: "panels:contribution.kpi.title" }} />

      <div className="flex gap-md">
        {applicantsFormattedValue ? (
          <Paper
            border="primary"
            background="primary"
            px="md"
            py="md"
            classNames={{ base: "flex flex-col gap-md justify-between" }}
          >
            <Typo size="xs" color="secondary" translate={{ token: "panels:contribution.kpi.items.applicants" }} />
            <Typo variant="heading" size="xs" color="secondary">
              {applicantsFormattedValue}
            </Typo>
          </Paper>
        ) : null}

        {projectContributorsFormattedValue ? (
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
              {projectContributorsFormattedValue}
            </Typo>
          </Paper>
        ) : null}

        {newContributorsFormattedValue ? (
          <Paper
            border="primary"
            background="primary"
            px="md"
            py="md"
            classNames={{ base: "flex flex-col gap-md justify-between" }}
          >
            <Typo size="xs" color="secondary" translate={{ token: "panels:contribution.kpi.items.newContributors" }} />
            <Typo variant="heading" size="xs" color="secondary">
              {newContributorsFormattedValue}
            </Typo>
          </Paper>
        ) : null}
      </div>
    </Paper>
  );
}
