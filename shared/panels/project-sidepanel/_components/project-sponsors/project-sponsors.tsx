import { Typo } from "@/design-system/atoms/typo";

import { SponsorGroup } from "@/shared/features/sponsor/sponsor-group/sponsor-group";

import { ProjectSponsorsProps } from "./project-sponsors.types";

export function ProjectSponsors({ sponsors }: ProjectSponsorsProps) {
  if (!sponsors?.length) return null;

  return (
    <div className={"flex flex-col gap-1"}>
      <Typo size={"xs"} color={"secondary"} translate={{ token: "panels:projectDetail.sponsors.title" }} />
      <SponsorGroup sponsors={sponsors} avatarProps={{ size: "s" }} maxSponsors={2} />
    </div>
  );
}
