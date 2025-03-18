import { ContributeNow } from "@/app/(saas)/projects/[projectSlug]/_features/contribute-now/contribute-now";

import { TypographyH2, TypographyP } from "@/shared/ui/typography";

import { ProjectHeaderAlert } from "./project-header-alert";
import { ProjectHeaderBookmark } from "./project-header-bookmark";

export function ProjectHeader({
  id,
  name,
  shortDescription,
}: {
  id?: string;
  name?: string;
  shortDescription?: string;
}) {
  return (
    <header className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between gap-1">
        {name ? <TypographyH2>{name}</TypographyH2> : <div />}

        <div className="flex items-center justify-end gap-3">
          <ProjectHeaderAlert projectId={id} />
          <ProjectHeaderBookmark projectId={id} projectName={name} />
          <ContributeNow projectId={id} />
        </div>
      </div>

      <TypographyP className="text-muted-foreground">{shortDescription}</TypographyP>
    </header>
  );
}
