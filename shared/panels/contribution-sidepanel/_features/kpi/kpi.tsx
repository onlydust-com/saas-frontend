import { KpiBlock } from "@/shared/components/kpi/kpi-block/kpi-block";
import { KpiCard } from "@/shared/components/kpi/kpi-card/kpi-card";
import { Translate } from "@/shared/translation/components/translate/translate";

import { KpiProps } from "./kpi.types";

export function Kpi({ applicants, projectContributors, newContributors }: KpiProps) {
  const applicantsFormattedValue = Intl.NumberFormat().format(applicants || 0);
  const projectContributorsFormattedValue = Intl.NumberFormat().format(projectContributors || 0);
  const newContributorsFormattedValue = Intl.NumberFormat().format(newContributors || 0);

  return (
    <KpiCard>
      {applicantsFormattedValue ? (
        <KpiBlock
          title={<Translate token={"panels:contribution.kpi.items.applicants"} />}
          value={applicantsFormattedValue}
        />
      ) : null}

      {projectContributorsFormattedValue ? (
        <KpiBlock
          title={<Translate token={"panels:contribution.kpi.items.projectContributors"} />}
          value={projectContributorsFormattedValue}
        />
      ) : null}

      {newContributorsFormattedValue ? (
        <KpiBlock
          title={<Translate token={"panels:contribution.kpi.items.newContributors"} />}
          value={newContributorsFormattedValue}
        />
      ) : null}
    </KpiCard>
  );
}
