import Link from "next/link";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographySmall } from "@/shared/ui/typography";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectContributors({ projectIdOrSlug }: { projectIdOrSlug: string }) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectContributorsV2({
    queryParams: {
      pageSize: 5,
    },
    pathParams: {
      projectIdOrSlug,
    },
  });

  const contributors = useMemo(() => data?.pages?.flatMap(page => page.contributors) ?? [], [data]);

  if (isLoading) {
    return (
      <ProjectAsideSection.Skeleton hasSeparator>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !contributors || contributors.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Maintainers" hasSeparator>
      <div className="flex flex-col gap-3">
        {contributors.map(contributor => (
          <Link
            key={contributor.login}
            href={NEXT_ROUTER.users.details.root(contributor.login)}
            className="flex items-center gap-2"
          >
            <Avatar className="size-8">
              <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
              <AvatarFallback>{contributor.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <TypographySmall>{contributor.login}</TypographySmall>
          </Link>
        ))}
      </div>
    </ProjectAsideSection>
  );
}
