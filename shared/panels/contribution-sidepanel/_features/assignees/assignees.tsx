import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";

import { AssigneesProps } from "./assignees.types";

export function Assignees({ contributors }: AssigneesProps) {
  return (
    <div className={"flex flex-col gap-lg"}>
      {contributors?.map(contributor => (
        <ProfileCard
          key={contributor.githubUserId}
          headerProps={{
            headerLabel: { children: "Assigned" },
            badgeProps: { children: "2 days ago", color: "success" },
          }}
          user={contributor.toPublicModel()}
          footerContent={
            <Button variant={"secondary"} classNames={{ base: "w-full" }}>
              Remove contributor
            </Button>
          }
        />
      ))}
    </div>
  );
}
