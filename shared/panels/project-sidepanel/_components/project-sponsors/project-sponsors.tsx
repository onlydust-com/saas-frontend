import { Typo } from "@/design-system/atoms/typo";

import { SponsorGroup } from "@/shared/features/sponsor/sponsor-group/sponsor-group";

import { ProjectSponsorsProps } from "./project-sponsors.types";

export function ProjectSponsors({ sponsors }: ProjectSponsorsProps) {
  if (!sponsors?.length) return null;

  return (
    <div className={"flex flex-1 flex-col gap-1 overflow-hidden"}>
      <Typo as={"div"} size={"xs"} color={"secondary"} translate={{ token: "panels:projectDetail.sponsors.title" }} />
      <SponsorGroup sponsors={sponsors} maxSponsors={1} />
    </div>
  );
}
