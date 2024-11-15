import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import {
  UseContributionActionReturn,
  UseContributionActionsProps,
} from "@/shared/hooks/contributions/use-contribution-actions";
import { Translate } from "@/shared/translation/components/translate/translate";

export const useContributionAsContributorActions = ({
  actions,
  contribution,
}: UseContributionActionsProps): UseContributionActionReturn => {
  function onSeeApplication() {
    actions?.onAction?.(contribution.id);
  }

  function onSeeDetails() {
    actions?.onAction?.(contribution.id);
  }

  switch (contribution.activityStatus) {
    case ContributionActivityStatus.NOT_ASSIGNED:
    case ContributionActivityStatus.IN_PROGRESS:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.asContributor.seeApplication"} />,
            onClick: onSeeApplication,
          },
        ],
      };
    case ContributionActivityStatus.DONE:
    case ContributionActivityStatus.ARCHIVED:
    case ContributionActivityStatus.TO_REVIEW:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.asContributor.seeDetail"} />,
            onClick: onSeeDetails,
          },
        ],
      };
    default:
      return { buttons: [] };
  }
};
