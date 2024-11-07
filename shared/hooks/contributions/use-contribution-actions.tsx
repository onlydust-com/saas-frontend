import { useParams } from "next/navigation";
import { ReactNode } from "react";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { toast } from "@/design-system/molecules/toaster";

import { CardContributionKanbanActions } from "@/shared/features/card-contribution-kanban/card-contribution-kanban.types";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { useActionPooling } from "@/shared/hooks/action-pooling/action-pooling.context";
import { Github } from "@/shared/icons";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useCanReward } from "../rewards/use-can-reward";

export const useContributionActions = (
  contribution: ContributionActivityInterface,
  actions?: CardContributionKanbanActions
): { buttons: ButtonGroupPort["buttons"]; endContent?: ReactNode } => {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { open: openRewardFlow, removeContributorId, selectedGithubUserIds } = useRewardFlow();
  const { startPooling, shouldRefetch } = useActionPooling();
  const { isProjectOrganisationMissingPermissions, canCurrentUserUpdatePermissions, setIsGithubPermissionModalOpen } =
    useGithubPermissionsContext();

  const canReward = useCanReward(projectSlug);

  const { mutate: updatePullRequest, isPending: isUpdatingPullRequest } =
    GithubReactQueryAdapter.client.useUpdatePullRequest({
      pathParams: {
        contributionUuid: contribution.id,
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:cardContributionKanban.toasts.updatePullRequest.success"} />);
        },
        onError: () => {
          toast.error(<Translate token={"features:cardContributionKanban.toasts.updatePullRequest.error"} />);
        },
      },
    });

  const {
    mutate: updateIssues,
    mutateAsync: updateIssuesAsync,
    isPending: isUpdatingIssue,
  } = IssueReactQueryAdapter.client.useUpdateIssue({
    pathParams: {
      contributionUuid: contribution.id,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"features:cardContributionKanban.toasts.updateIssue.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"features:cardContributionKanban.toasts.updateIssue.error"} />);
      },
    },
  });

  const { mutate: unassignContribution, isPending: isUnassigningContribution } =
    ProjectReactQueryAdapter.client.useUnassignContributorFromProjectContribution({
      pathParams: {
        contributionUuid: contribution.id,
        projectId: contribution.project?.id ?? "",
        contributorId: contribution.contributors[0]?.githubUserId,
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:cardContributionKanban.toasts.unassign.success"} />);
          startPooling();
        },
        onError: () => {
          toast.error(<Translate token={"features:cardContributionKanban.toasts.unassign.error"} />);
        },
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
    unassignContribution({});
  }

  function onCodeReview() {
    if (!contribution.githubHtmlUrl) {
      actions?.onAction?.(contribution.id);
      return;
    }

    window.open(contribution.githubHtmlUrl, "_blank");
  }

  async function onArchive() {
    if (contribution.isIssue()) {
      updateIssues({
        archived: true,
      });
    } else if (contribution.isPullRequest()) {
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
    if (contribution.isIssue()) {
      updateIssues({
        archived: false,
      });
    } else if (contribution.isPullRequest()) {
      updatePullRequest({
        archived: false,
      });
    }
  }

  async function onCloseIssue() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    await updateIssuesAsync({
      closed: true,
    });

    startPooling();
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
    case ContributionActivityStatus.IN_PROGRESS:
      if (contribution.isPullRequest()) return { buttons: [] };

      if (
        isProjectOrganisationMissingPermissions(contribution.repo.id) &&
        !canCurrentUserUpdatePermissions(contribution.repo.id)
      ) {
        return {
          buttons: [],
          endContent: (
            <Tooltip content={<Translate token="features:cardContributionKanban.tooltip.insufficientPermissions" />}>
              <Badge
                size="xs"
                color="warning"
                shape="rounded"
                translate={{ token: "features:cardContributionKanban.actions.insufficientPermissions" }}
              />
            </Tooltip>
          ),
        };
      }

      return {
        buttons: [
          ...(contribution.contributors.length
            ? [
                {
                  children: <Translate token={"features:cardContributionKanban.actions.unassign"} />,
                  onClick: onUnassign,
                  isLoading: isUnassigningContribution,
                  isDisabled: !!shouldRefetch,
                },
              ]
            : []),
          ...(contribution.isIssue()
            ? [
                {
                  children: <Translate token={"features:cardContributionKanban.actions.close"} />,
                  onClick: onCloseIssue,
                  isLoading: isUpdatingIssue,
                  isDisabled: !!shouldRefetch,
                },
              ]
            : []),
        ],
      };
    case ContributionActivityStatus.TO_REVIEW:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.codeReview"} />,
            onClick: onCodeReview,
            startIcon: { component: Github },
          },
        ],
      };
    case ContributionActivityStatus.DONE:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.archive"} />,
            onClick: onArchive,
            isDisabled: isUpdatingPullRequest || isUpdatingIssue,
          },
          {
            children: <Translate token={"features:cardContributionKanban.actions.reward"} />,
            onClick: onReward,
            isDisabled: !canReward,
            tooltip: {
              enabled: !canReward,
              content: <Translate token={"common:tooltip.disabledReward"} />,
            },
          },
        ],
      };
    case ContributionActivityStatus.ARCHIVED:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.unarchive"} />,
            onClick: onUnarchive,
            isLoading: isUpdatingPullRequest || isUpdatingIssue,
          },
        ],
      };
    default:
      return { buttons: [] };
  }
};
