import { useQueryClient } from "@tanstack/react-query";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";

import { CardContributionKanbanActions } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.types";
import { Github } from "@/shared/icons";
import { Translate } from "@/shared/translation/components/translate/translate";

const useContributionActions = (
  contribution: ContributionActivityInterface,
  actions: CardContributionKanbanActions
): ButtonGroupPort["buttons"] => {
  const queryClient = useQueryClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const { mutateAsync, isPending } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId: contribution.id },
  });

  async function invalidateContributions() {
    await queryClient.invalidateQueries({
      queryKey: contributionStoragePort.getContributions({}).tag,
      exact: false,
    });
  }

  function onReview() {
    actions?.onReview?.(contribution.id);
    actions?.onAction?.(contribution.id);
  }

  function onUnassign() {
    actions?.onUnassign?.(contribution.id);
    actions?.onAction?.(contribution.id);
  }

  function onCodeReview() {
    if (!contribution.githubHtmlUrl) {
      actions?.onAction?.(contribution.id);
      return;
    }

    window.open(contribution.githubHtmlUrl, "_blank");
  }

  async function onArchive() {
    await mutateAsync({ archived: true });
    await invalidateContributions();
  }

  function onReward() {
    actions?.onReward?.(contribution.id);
    actions?.onAction?.(contribution.id);
  }

  async function onUnarchive() {
    await mutateAsync({ archived: false });
    await invalidateContributions();
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
          isDisabled: isPending,
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
          isDisabled: isPending,
        },
      ];
    default:
      return [];
  }
};

export const CardContributionKanbanHooks = {
  useContributionActions,
};
