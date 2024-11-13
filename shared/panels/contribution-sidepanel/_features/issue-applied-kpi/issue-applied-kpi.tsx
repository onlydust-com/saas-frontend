import { KpiBlock } from "@/shared/components/kpi/kpi-block/kpi-block";
import { KpiCard } from "@/shared/components/kpi/kpi-card/kpi-card";
import { IssueAppliedKpiProps } from "@/shared/panels/contribution-sidepanel/_features/issue-applied-kpi/issue-applied-kpi.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function IssueAppliedKpi({ applicants = 0, comments = 0, openSince = 0 }: IssueAppliedKpiProps) {
  const applicantsFormattedValue = Intl.NumberFormat().format(applicants);
  const commentsFormattedValue = Intl.NumberFormat().format(comments);
  const openSinceFormattedValue = Intl.NumberFormat().format(openSince);

  return (
    <KpiCard>
      {applicantsFormattedValue ? (
        <KpiBlock
          title={<Translate token={"panels:contribution.kpi.items.applicants"} />}
          value={applicantsFormattedValue}
        />
      ) : null}

      {commentsFormattedValue ? (
        <KpiBlock
          title={<Translate token={"panels:contribution.kpi.items.comments"} />}
          value={commentsFormattedValue}
        />
      ) : null}

      {openSinceFormattedValue ? (
        <KpiBlock title={<Translate token={"panels:contribution.kpi.items.days"} />} value={openSinceFormattedValue} />
      ) : null}
    </KpiCard>
  );
}
