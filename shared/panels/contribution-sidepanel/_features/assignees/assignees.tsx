import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { toast } from "@/design-system/molecules/toaster";

import { ContributorProfileCompact } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { AssigneesProps } from "./assignees.types";

function Assignee({
  user,
  showRemove,
  contribution,
}: {
  user: UserPublicInterface;
  showRemove?: boolean;
  contribution: ContributionActivityInterface;
}) {
  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

  const { mutate: unassignContribution, isPending: isUnassigningContribution } =
    ProjectReactQueryAdapter.client.useUnassignContributorFromProjectContribution({
      pathParams: {
        contributionUuid: contribution.id,
        projectId: contribution.project?.id ?? "",
        contributorId: user.githubUserId,
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:cardContributionKanban.toasts.unassign.success"} />);
        },
        onError: () => {
          toast.error(<Translate token={"features:cardContributionKanban.toasts.unassign.error"} />);
        },
      },
    });

  function removeContributorButton() {
    if (!showRemove) {
      return null;
    }

    function onClick() {
      if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
        setIsGithubPermissionModalOpen(true);
        return;
      }

      unassignContribution({});
    }

    return (
      <Button
        variant={"secondary"}
        classNames={{ base: "w-full" }}
        translate={{ token: "panels:contribution.contributors.removeButton" }}
        onClick={onClick}
        isLoading={isUnassigningContribution}
      />
    );
  }

  return (
    <ContributorProfileCompact
      headerProps={{
        headerLabel: { translate: { token: "panels:contribution.contributors.contributors" } },
        badgeProps: { children: "2 days ago", color: "success" },
      }}
      user={user}
      footerContent={removeContributorButton()}
    />
  );
}

export function Assignees({ contribution, showRemove }: AssigneesProps) {
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      contributedTo: [contribution.id],
    },
  });

  const flatContributors = data?.pages.map(contributor => contributor.contributors).flat() ?? [];

  if (isLoading) {
    return (
      <div className={"flex flex-col gap-lg"}>
        <Skeleton classNames={{ base: "h-[100px] w-full" }} />
        <Skeleton classNames={{ base: "h-[100px] w-full" }} />
        <Skeleton classNames={{ base: "h-[100px] w-full" }} />
      </div>
    );
  }

  if (!flatContributors?.length) {
    return null;
  }

  return (
    <div className={"flex flex-col gap-lg"}>
      {flatContributors?.map(contributor => (
        <Assignee
          key={contributor.contributor.githubUserId}
          user={contributor.toContributorPublicModel()}
          contribution={contribution}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
}
