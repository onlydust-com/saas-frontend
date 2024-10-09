import { useMemo } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { AssigneesProps } from "./assignees.types";

export function Assignees({ contributors, showRemove, type }: AssigneesProps) {
  function removeContributorButton() {
    if (!showRemove) {
      return null;
    }

    return (
      <Button
        variant={"secondary"}
        classNames={{ base: "w-full" }}
        translate={{ token: "panels:contribution.contributors.removeButton" }}
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

  if (contributors?.length) {
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
          footerContent={removeContributorButton()}
        />
      ))}
    </div>
  );
}
