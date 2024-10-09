import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { AssigneesProps } from "./assignees.types";

export function Assignees({ contributors, contributionId, showRemove, type }: AssigneesProps) {
  const { mutate, isPending } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId },
  });

  function removeContributorButton(githubUserId: number) {
    if (!showRemove) {
      return null;
    }

    function onClick() {
      mutate({
        assignees: contributors
          .filter(contributor => contributor.githubUserId !== githubUserId)
          .map(contributor => contributor.githubUserId),
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

  const title: TranslateProps | undefined = useMemo(() => {
    if (type === "assignees") {
      return { token: "panels:contribution.contributors.assignees" };
    }

    if (type === "contributors") {
      return { token: "panels:contribution.contributors.contributors" };
    }

    if (type === "applicants") {
      return { token: "panels:contribution.contributors.applicants" };
    }
  }, [type]);

  if (!contributors?.length) {
    return null;
  }

  return (
    <div className={"flex flex-col gap-lg"}>
      {contributors?.map(contributor => (
        <ProfileCard
          key={contributor.githubUserId}
          headerProps={{
            headerLabel: { translate: title },
            badgeProps: { children: "2 days ago", color: "success" },
          }}
          user={contributor.toPublicModel()}
          footerContent={removeContributorButton(contributor.githubUserId)}
        />
      ))}
    </div>
  );
}
