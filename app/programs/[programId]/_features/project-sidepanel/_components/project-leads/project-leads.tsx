import { Typo } from "@/design-system/atoms/typo";

import { UserGroup } from "@/shared/features/user/user-group/user-group";

import { ProjectLeadsProps } from "./project-leads.types";

export function ProjectLeads({ leaders }: ProjectLeadsProps) {
  if (!leaders.length) return null;

  return (
    <div className={"flex flex-1 flex-col gap-1"}>
      <Typo as={"div"} size={"xs"} color={"text-2"} translate={{ token: "programs:projectDetail.lead.title" }} />
      <UserGroup avatarProps={{ size: "s" }} users={leaders} maxUsers={2} />
    </div>
  );
}
