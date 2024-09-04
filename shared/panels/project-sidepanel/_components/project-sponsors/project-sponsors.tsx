import { Typo } from "@/design-system/atoms/typo";

import { SponsorGroup } from "@/shared/features/sponsor/sponsor-group/sponsor-group";

import { ProjectSponsorsProps } from "./project-sponsors.types";

export function ProjectSponsors({ programs }: ProjectSponsorsProps) {
  if (!programs?.length) return null;

  return (
    <div className={"flex flex-1 flex-col gap-1 overflow-hidden"}>
      <Typo as={"div"} size={"xs"} color={"text-2"} translate={{ token: "panels:projectDetail.sponsors.title" }} />
      <SponsorGroup programs={programs} maxSponsors={1} />
    </div>
  );
}
