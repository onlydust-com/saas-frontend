import { Typo } from "@/design-system/atoms/typo";

import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { ProjectContributorsProps } from "./project-contributors.types";

export function ProjectContributors({ topContributors }: ProjectContributorsProps) {
  if (!topContributors.length) return null;

  return (
    <div className={"flex flex-col gap-1"}>
      <Typo size={"xs"} color={"secondary"} translate={{ token: "panels:projectDetail.topContributors.title" }} />
      <UserGroup avatarProps={{ size: "sm" }} users={topContributors} maxUsers={2} />
    </div>
  );
}
