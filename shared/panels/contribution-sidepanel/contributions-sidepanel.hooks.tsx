import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { AssigneContributors } from "@/shared/panels/contribution-sidepanel/_features/assigne-contributors/assigne-contributors";
import { Assignees } from "@/shared/panels/contribution-sidepanel/_features/assignees/assignees";
import { IssueOverview } from "@/shared/panels/contribution-sidepanel/_features/issue-overview/issue-overview";
import { LinkedIssues } from "@/shared/panels/contribution-sidepanel/_features/linked-issues/linked-issues";
import { Timeline } from "@/shared/panels/contribution-sidepanel/_features/timeline/timeline";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { Helper } from "./_features/helper/helper";

export function useContributionsSidepanel() {
  return useSinglePanelContext<ContributionsPanelData>("contribution-details");
}

interface UseContributionBlocks {
  contribution: ContributionActivityInterface | undefined;
  helperState: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  };
}

export function useContributionBlocks({ contribution, helperState }: UseContributionBlocks) {
  if (!contribution) {
    return null;
  }

  if (contribution?.activityStatus === ContributionActivityStatus.NOT_ASSIGNED) {
    return (
      <>
        <Helper
          type={contribution?.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview issue={contribution} />
        <AssigneContributors contributionId={contribution?.githubId} />
      </>
    );
  }

  if (contribution?.activityStatus === ContributionActivityStatus.IN_PROGRESS) {
    return (
      <>
        <IssueOverview issue={contribution} />
        <Assignees contributors={contribution.assignees} type={"assignees"} />
        <Timeline id={contribution.id} />
      </>
    );
  }

  if (contribution?.activityStatus === ContributionActivityStatus.TO_REVIEW) {
    return (
      <>
        <Helper
          type={contribution?.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview issue={contribution} />
        <LinkedIssues issues={contribution?.linkedIssues} id={contribution?.id} />
        <Assignees contributors={contribution.contributors} type={"contributors"} />
        <Timeline id={contribution.id} />
      </>
    );
  }

  if (
    contribution?.activityStatus === ContributionActivityStatus.ARCHIVED ||
    contribution?.activityStatus === ContributionActivityStatus.DONE
  ) {
    return (
      <>
        <IssueOverview issue={contribution} />
        <LinkedIssues issues={contribution?.linkedIssues} id={contribution?.id} />
        <Assignees contributors={contribution.contributors} type={"contributors"} />
        <Timeline id={contribution.id} />
      </>
    );
  }
}
