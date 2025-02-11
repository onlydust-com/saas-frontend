"use client";

import { BugIcon, GitPullRequestIcon, StarIcon, Users } from "lucide-react";
import Image from "next/image";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Avatar as AvatarDs } from "@/design-system/atoms/avatar";

import { Github } from "@/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

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
              <PopoverContent align="end" className="w-[460px] p-0">
                <Image src={ContributeNow} alt="Contribute now" width={460} />
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
      </div>
    </div>
  );
}
