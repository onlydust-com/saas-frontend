import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort, ButtonPort } from "@/design-system/atoms/button/button.types";

import { CardContributionKanbanActions } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.types";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { Github } from "@/shared/icons";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export const useContributionActions = (
  contribution: ContributionActivityInterface,
  actions?: CardContributionKanbanActions
): ButtonGroupPort["buttons"] | ButtonPort<"button">[] => {
  const { open: openRewardFlow, removeContributorId, selectedGithubUserIds } = useRewardFlow();

  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

  const { mutate: updatePullRequest, isPending: isUpdatingPullRequest } =
    GithubReactQueryAdapter.client.useUpdatePullRequest({
      pathParams: {
        contributionUuid: contribution.id,
      },
    });

  const { mutate: updateIssues, isPending: isUpdatingIssue } = IssueReactQueryAdapter.client.useUpdateIssue({
    pathParams: {
      contributionUuid: contribution.id,
    },
  });

  function onReview() {
    actions?.onAction?.(contribution.id);
  }

  function onUnassign() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }
    // TODO UNASSIGN in kanban actions
    //mutate({ assignees: [] });
  }

  function onCodeReview() {
    if (!contribution.githubHtmlUrl) {
      actions?.onAction?.(contribution.id);
      return;
    }

    window.open(contribution.githubHtmlUrl, "_blank");
  }

  async function onArchive() {
    if (contribution.type === "ISSUE") {
      updateIssues({
        archived: true,
      });
    } else if (contribution.type === "PULL_REQUEST") {
      updatePullRequest({
        archived: true,
      });
    }
  }

  function onReward() {
    selectedGithubUserIds.forEach(removeContributorId);

    openRewardFlow({
      contributions: [contribution.toItemDto()],
      githubUserIds: contribution.contributors.map(contributor => contributor.githubUserId),
    });
  }

  async function onUnarchive() {
    if (contribution.type === "ISSUE") {
      updateIssues({
        archived: false,
      });
    } else if (contribution.type === "PULL_REQUEST") {
      updatePullRequest({
        archived: false,
      });
    }
  }

  async function onCloseIssue() {
    updateIssues({
      closed: true,
    });
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
      if (contribution.type === "PULL_REQUEST") return [];

      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.unassign"} />,
          onClick: onUnassign,
        },
        ...(contribution.type === "ISSUE"
          ? [
              {
                children: <Translate token={"features:cardContributionKanban.actions.close"} />,
                onClick: onCloseIssue,
              },
            ]
          : []),
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
          isDisabled: isUpdatingPullRequest || isUpdatingIssue,
        },
        ...(contribution.totalRewardedUsdAmount !== 0
          ? []
          : [
              {
                children: <Translate token={"features:cardContributionKanban.actions.reward"} />,
                onClick: onReward,
              },
            ]),
      ];
    case ContributionActivityStatus.ARCHIVED:
      return [
        {
          children: <Translate token={"features:cardContributionKanban.actions.unarchive"} />,
          onClick: onUnarchive,
          isDisabled: isUpdatingPullRequest || isUpdatingIssue,
        },
      ];
    default:
      return [];
  }
};
