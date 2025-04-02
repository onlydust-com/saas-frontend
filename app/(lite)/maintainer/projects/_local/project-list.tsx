"use client";

import Link from "next/link";
import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";

export function ProjectList() {
  const { user, isLoading: isUserLoading } = useAuthUser();

  const projectIds = useMemo(() => user?.projectsLed?.map(project => project.id) ?? [], [user]);

  const {
    data,
    isLoading: isProjectsLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { projectIds },
    options: {
      enabled: projectIds.length > 0,
    },
  });

  const isLoading = isUserLoading || isProjectsLoading;

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <Skeleton className="h-[90px] w-full" />
        <Skeleton className="h-[90px] w-full" />
        <Skeleton className="h-[90px] w-full" />
      </section>
    );
  }

  if (isError) {
    return <TypographyMuted className="py-16 text-center">Error loading projects</TypographyMuted>;
  }

  if (projects.length === 0) {
    return <TypographyMuted className="py-16 text-center">No projects found</TypographyMuted>;
  }

  return (
    <section className="flex flex-col gap-4">
      {projects.map(project => (
        <Link key={project.id} href={NEXT_ROUTER.maintainer.projects.details.root(project.slug)}>
          <Card className={"flex w-full items-center gap-4 p-3"}>
            <Avatar className="size-16 rounded-xl">
              <AvatarImage src={project.logoUrl} />
              <AvatarFallback className="rounded-xl">{project.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <TypographyH4 className="line-clamp-1">{project.name}</TypographyH4>
              <TypographyMuted className="line-clamp-1">{project.shortDescription}</TypographyMuted>
            </div>
          </Card>
        </Link>
      ))}
    </section>
  );
}
