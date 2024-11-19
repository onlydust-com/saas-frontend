import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionAs, ContributionAsUnion } from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";

import { CardContributionKanbanActions } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.types";
import { useContributionAsContributorActions } from "@/shared/hooks/contributions/use-contribution-as-contributor-actions";
import { useContributionAsMaintainerActions } from "@/shared/hooks/contributions/use-contribution-as-maintainer-actions";

export interface UseContributionActionsProps {
  contribution: ContributionActivityInterface;
  actions?: CardContributionKanbanActions;
  as?: ContributionAsUnion;
}

export interface UseContributionActionReturn {
  buttons: ButtonGroupPort["buttons"];
}

export const useContributionActions = (props: UseContributionActionsProps): UseContributionActionReturn => {
  const maintainer = useContributionAsMaintainerActions(props);
  const contributor = useContributionAsContributorActions(props);

  if (props.as === ContributionAs.MAINTAINER) {
    return maintainer;
  }

  if (props.as === ContributionAs.CONTRIBUTOR) {
    return contributor;
  }

  return { buttons: [] };
};
