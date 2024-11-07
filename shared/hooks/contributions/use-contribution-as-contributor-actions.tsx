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
  function onReview() {
    actions?.onAction?.(contribution.id);
  }

  switch (contribution.activityStatus) {
    case ContributionActivityStatus.NOT_ASSIGNED:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.review"} />,
            onClick: onReview,
          },
        ],
      };
    default:
      return { buttons: [] };
  }
};
