"use client";

import { BugIcon, GitPullRequestIcon, StarIcon, Users } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Avatar as AvatarDs } from "@/design-system/atoms/avatar";

import { Github } from "@/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { badgeVariants } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographySmall } from "@/shared/ui/typography";

import ContributeNow from "./contribute-now.png";

interface ProjectHeaderProps {
  projectSlug: string;
}

export function ProjectHeader({ projectSlug }: ProjectHeaderProps) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const { data: contributorsData } = ProjectReactQueryAdapter.client.useGetProjectContributorsV2({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const renderHeaderLanguages = useCallback(() => {
    if (project?.languages && Object.keys(project.languages).length === 0) return null;

    const languages = Object.values(project?.languages || {});

    const hasExtraLanguages = languages.length > 3;

    return (
      <div className="flex items-center gap-1">
        {languages.slice(0, 3).map(language => (
          <Avatar className="size-5" key={language.name}>
            <AvatarImage src={language.logoUrl} />
            <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}

        {hasExtraLanguages && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className={badgeVariants({ variant: "outline" })}>+{languages.length - 1}</button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <ul className="flex flex-col gap-2">
                {languages.map(language => (
                  <li key={language.name} className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-1">
                      <Avatar className="size-5" key={language.name}>
                        <AvatarImage src={language.logoUrl} />
                        <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <TypographySmall>{language.name}</TypographySmall>
                    </div>

                    <TypographySmall>{language.percentage}%</TypographySmall>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }, [project?.languages]);

  if (!project) return null;

  const contributors = contributorsData?.pages?.[0]?.contributors || [];

  const stats = [
    {
      label: "Contributors",
      value: project.contributorCount,
      icon: Users,
      extra: contributors.length > 0 && (
        <div className="ml-2 flex -space-x-2 overflow-hidden">
          {contributors.slice(0, 4).map(contributor => (
            <Avatar key={contributor.githubUserId} className="h-5 w-5 border border-background">
              <AvatarImage src={contributor.avatarUrl} alt={contributor.login} />
              <AvatarFallback>{contributor.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
          {project.contributorCount > 4 && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-background bg-muted text-[10px] font-medium">
              +{project.contributorCount - 4}
            </div>
          )}
        </div>
      ),
    },
    {
      label: "PRs Merged",
      value: project.mergedPrCount,
      icon: GitPullRequestIcon,
    },
    {
      label: "Stars",
      value: project.starCount,
      icon: StarIcon,
    },
    {
      label: "Open Issues",
      value: project.availableIssueCount,
      icon: BugIcon,
    },
  ];

  return (
    <div className="space-y-6 px-6">
      {/* Project Info Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {project.logoUrl && <AvatarDs src={project.logoUrl} alt={project.name} size="xl" shape="squared" />}
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">{project.shortDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>

            <Popover>
              <PopoverTrigger asChild>
                <Button>Contribute now</Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[460px] overflow-hidden p-0">
                <ScrollArea style={{ height: "700px" }}>
                  <Image src={ContributeNow} alt="Contribute now" width={460} />
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center divide-x">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-2 px-6 first:pl-0 last:pr-0">
              {stat.extra ? (
                stat.extra
              ) : (
                <>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-baseline gap-1">
                    <p className="text-base font-medium">{stat.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
        <div className="flex items-center gap-2 px-6 first:pl-0 last:pr-0">{renderHeaderLanguages()}</div>
      </div>
    </div>
  );
}
