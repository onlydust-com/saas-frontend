import { Typo } from "@/design-system/atoms/typo";

import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { ProjectContributorsProps } from "./project-contributors.types";

export function ProjectContributors({ topContributors, contributorCount }: ProjectContributorsProps) {
  if (!topContributors.length) return null;

  return (
    <div className={"flex flex-1 flex-col gap-1"}>
      <Typo
        as={"div"}
        size={"xs"}
        color={"text-2"}
        translate={{ token: "programs:projectDetail.contributors.title" }}
      />
      <UserGroup avatarProps={{ size: "s" }} users={topContributors} totalUsersCount={contributorCount} />
    </div>
  );
}
