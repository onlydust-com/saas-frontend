import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { ContributorProfileCompact } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact";

import { AssigneesProps } from "./assignees.types";

export function Assignees({ contributionGithubId, contributionType, showRemove }: AssigneesProps) {
  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      contributedTo: {
        githubId: contributionGithubId,
        type: contributionType,
      },
    },
  });

  const flatContributors = data?.pages.map(contributor => contributor.contributors).flat() ?? [];

  const { mutate, isPending } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId: contributionGithubId },
  });

  function removeContributorButton(githubUserId: number) {
    if (!showRemove) {
      return null;
    }

    function onClick() {
      mutate({
        assignees: flatContributors
          .filter(contributor => contributor.contributor.githubUserId !== githubUserId)
          .map(contributor => contributor.contributor.githubUserId),
      });
    }

    return (
      <Button
        variant={"secondary"}
        classNames={{ base: "w-full" }}
        translate={{ token: "panels:contribution.contributors.removeButton" }}
        onClick={onClick}
        isDisabled={isPending}
      />
    );
  }

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
        <ContributorProfileCompact
          key={contributor.contributor.githubUserId}
          headerProps={{
            headerLabel: { translate: { token: "panels:contribution.contributors.contributors" } },
            badgeProps: { children: "2 days ago", color: "success" },
          }}
          user={contributor.toContributorPublicModel()}
          footerContent={removeContributorButton(contributor.contributor.githubUserId)}
        />
      ))}
    </div>
  );
}
