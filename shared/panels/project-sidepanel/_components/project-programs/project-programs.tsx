import { Typo } from "@/design-system/atoms/typo";

import { ProgramGroup } from "@/shared/features/program/program-group/program-group";
import { ProjectProgramsProps } from "@/shared/panels/project-sidepanel/_components/project-programs/project-programs.types";

export function ProjectPrograms({ programs }: ProjectProgramsProps) {
  if (!programs?.length) return null;

  return (
    <div className={"flex flex-col gap-1"}>
      <Typo size={"xs"} color={"secondary"} translate={{ token: "panels:projectDetail.programs.title" }} />
      <ProgramGroup programs={programs} avatarProps={{ size: "sm" }} maxPrograms={2} />
    </div>
  );
}
