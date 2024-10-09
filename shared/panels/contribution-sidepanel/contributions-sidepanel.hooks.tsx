import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { Assignees } from "@/shared/panels/contribution-sidepanel/_features/assignees/assignees";
import { IssueOverview } from "@/shared/panels/contribution-sidepanel/_features/issue-overview/issue-overview";
import { Kpi } from "@/shared/panels/contribution-sidepanel/_features/kpi/kpi";
import { LinkedIssues } from "@/shared/panels/contribution-sidepanel/_features/linked-issues/linked-issues";
import { Timeline } from "@/shared/panels/contribution-sidepanel/_features/timeline/timeline";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

export function useContributionsSidepanel() {
  return useSinglePanelContext<ContributionsPanelData>("contribution-details");
}

export function useContributionBlocks(contribution: ContributionActivityInterface | undefined) {
  if (!contribution) {
    return null;
  }

  if (contribution?.activityStatus === "NOT_ASSIGNED") {
    return (
      <>
        <IssueOverview issue={contribution} />
        <Kpi applicants={2} projectContributors={10} newContributors={8} />
      </>
    );
  }

  if (contribution?.activityStatus === "IN_PROGRESS") {
    return (
      <>
        <IssueOverview issue={contribution} />
        <Assignees contributors={contribution.assignees} />
        {/*// ASSIGNEES*/}
        <Timeline id={contribution.id} />
      </>
    );
  }

  if (contribution?.activityStatus === "TO_REVIEW") {
    return (
      <>
        <IssueOverview issue={contribution} />
        <LinkedIssues issues={contribution?.linkedIssues} id={contribution?.id} />
        <Assignees contributors={contribution.contributors} />
        {/*// ASSIGNEES*/}
        <Timeline id={contribution.id} />
      </>
    );
  }
}
