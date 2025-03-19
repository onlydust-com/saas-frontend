import { ContributeNow } from "@/app/(saas)/projects/[projectSlug]/_features/contribute-now/contribute-now";

import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

import { ProjectHeaderAlert } from "./project-header-alert";
import { ProjectHeaderBookmark } from "./project-header-bookmark";

export function ProjectHeader({
  id,
  name,
  shortDescription,
  isLoading,
  isError,
}: {
  id?: string;
  name?: string;
  shortDescription?: string;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <header className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-1">
          <Skeleton className="h-9 w-1/4" />

          <div className="flex items-center justify-end gap-3">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="h-9 w-[132px]" />
          </div>
        </div>

        <Skeleton className="h-7 w-full" />
      </header>
    );
  }

  if (isError) {
    return null;
  }

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

      {shortDescription ? <TypographyP className="text-muted-foreground">{shortDescription}</TypographyP> : null}
    </header>
  );
}
