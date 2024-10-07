import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";

import { Github } from "@/shared/icons";
import { Translate } from "@/shared/translation/components/translate/translate";

const useContributionActions = (contribution: ContributionActivityInterface): ButtonGroupPort["buttons"] => {
  function onReview() {
    alert("review applications ");
  }

  function onUnassign() {
    alert("unassign issue");
  }

  function onCodeReview() {
    if (!contribution.githubHtmlUrl) return;

    window.open(contribution.githubHtmlUrl, "_blank");
  }

  function onArchive() {
    alert("archive issue");
  }

  function onReward() {
    alert("reward contributors");
  }

  function onUnarchive() {
    alert("Unarchive issue");
  }

  switch (contribution.activityStatus) {
    case ContributionActivityStatus.NOT_ASSIGNED:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.review"} />,
          onClick: onReview,
        },
      ];
    case ContributionActivityStatus.IN_PROGRESS:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.unassign"} />,
          onClick: onUnassign,
        },
      ];
    case ContributionActivityStatus.TO_REVIEW:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.codeReview"} />,
          onClick: onCodeReview,
          startIcon: { component: Github },
        },
      ];
    case ContributionActivityStatus.DONE:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.archive"} />,
          onClick: onArchive,
        },
        {
          children: <Translate token={"features:cardContributionKanban.actions.reward"} />,
          onClick: onReward,
        },
      ];
    case ContributionActivityStatus.ARCHIVED:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.unarchive"} />,
          onClick: onUnarchive,
        },
      ];
    default:
      return [];
  }
};

export const CardContributionKanbanHooks = {
  useContributionActions,
};
