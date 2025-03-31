"use client";

import { GitFork, Star, UserRound } from "lucide-react";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardTitle } from "@/shared/ui/card";
import { TypographyH3, TypographyH4, TypographySmall } from "@/shared/ui/typography";

function Metrics({ stars, forks, contributors }: { stars: number; forks: number; contributors: number }) {
  return (
    <div className="flex items-center gap-md">
      <div className="flex items-center gap-sm">
        <Star className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(stars)}</TypographySmall>
      </div>
      <div className="flex items-center gap-sm">
        <GitFork className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(forks)}</TypographySmall>
      </div>
      <div className="flex items-center gap-sm">
        <UserRound className="size-3.5 shrink-0 text-muted-foreground" />

        <TypographySmall className="text-muted-foreground">{Intl.NumberFormat().format(contributors)}</TypographySmall>
      </div>
    </div>
  );
}

export default function MyProjects() {
  const { user } = useAuthUser();

  const projectIds = useMemo(() => user?.projectsLed?.map(project => project.id) ?? [], [user]);

  const { data } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { projectIds },
  });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  return (
    <PageContainer size="small" className="flex flex-col gap-6 py-6">
      <header>
        <TypographyH3>My Projects</TypographyH3>
      </header>

      <section className="flex flex-col gap-4">
        {projects.map(project => (
          <Card key={project.id} className={"flex flex-col gap-4 bg-stack p-4"}>
            <CardTitle className="flex w-full flex-row items-center justify-start gap-2">
              <Avatar className="size-12 rounded-xl">
                <AvatarImage src={project.logoUrl} />
                <AvatarFallback className="rounded-xl">{project.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <div className="line-clamp-1 flex-1">
                  <TypographyH4>{project.name}</TypographyH4>
                </div>

                <Metrics stars={project.starCount} forks={project.forkCount} contributors={project.contributorCount} />
              </div>
            </CardTitle>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}
