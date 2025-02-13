"use client";

import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark, CircleDotDashed, GitMerge, Star, User } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { toast } from "sonner";

import { BookmarkReactQueryAdapter } from "@/core/application/react-query-adapter/bookmark";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { ImageBanner } from "@/shared/features/image-banner/image-banner";
import { ProjectMoreInfo } from "@/shared/features/social/project-more-info/project-more-info";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Avatar, AvatarGroup } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { HoverBorderGradient } from "@/shared/ui/hover-border-gradient";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { TypographyH2, TypographyMuted, TypographyP, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { ProjectNavigation } from "../project-navigation/project-navigation";
import { PageHeaderProps } from "./page-header.types";

function Categories({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="flex gap-1 px-3 py-1 first:pl-0">
      {categories.map(category => (
        <Badge variant="outline" key={category}>
          {category}
        </Badge>
      ))}
    </div>
  );
}

function Languages({ languages }: { languages: ProjectInterfaceV2["languages"] }) {
  if (languages.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1 px-3 py-1 first:pl-0">
          {languages?.map(language => (
            <Avatar className="size-5" key={language.name}>
              <AvatarImage src={language.logoUrl} />
              <AvatarFallback className="rounded-xl">{language.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
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
  );
}

function Leads({ leads }: { leads: ProjectInterfaceV2["leads"] }) {
  const { open } = useContributorSidePanel();
  if (leads.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 px-3 py-1 first:pl-0">
          <TypographyMuted>Maintained by</TypographyMuted>
          <AvatarGroup
            avatars={
              leads.map(lead => ({
                src: lead.avatarUrl,
                alt: lead.login,
              })) ?? []
            }
            classNames={{
              avatar: "size-5 first:ml-0 -ml-2",
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end">
        <ul className="flex flex-col gap-2">
          {leads.map(leads => (
            <li
              key={leads.login}
              className="flex cursor-pointer items-center justify-between gap-10"
              onClick={() => open({ githubId: leads.githubUserId })}
            >
              <div className="flex items-center gap-1">
                <Avatar className="size-5" key={leads.login}>
                  <AvatarImage src={leads.avatarUrl} />
                  <AvatarFallback className="rounded-xl">{leads.login.charAt(0)}</AvatarFallback>
                </Avatar>
                <TypographySmall>{leads.login}</TypographySmall>
              </div>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}

function Stats({ project }: { project: ProjectInterfaceV2 | undefined }) {
  if (!project) return null;

  function renderItem({ label, value, Icon }: { label: string; value: ReactNode; Icon: ReactNode }) {
    return (
      <div className="flex flex-row items-center justify-start gap-1">
        {Icon}
        <TypographySmall>{value}</TypographySmall>
        <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
      </div>
    );
  }
  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-3">
      {renderItem({
        label: "Active contributors",
        value: project.contributorCount,
        Icon: <Icon component={User} color="red" />,
      })}
      {renderItem({
        label: "Availables issues",
        value: project.availableIssueCount,
        Icon: <Icon component={CircleDotDashed} color="green" />,
      })}
      {renderItem({
        label: "PRs Merged",
        value: project.mergedPrCount,
        Icon: <Icon component={GitMerge} color="purple" />,
      })}
      {renderItem({
        label: "Stars",
        value: project.starCount,
        Icon: <Icon component={Star} color="yellow" />,
      })}
    </div>
  );
}

function ActionHeader() {
  return (
    <HoverBorderGradient>
      <Button asChild>
        <span>Contribute now</span>
      </Button>
    </HoverBorderGradient>
  );
}

function BookMarkButton({ projectId, projectName }: { projectId: string; projectName: string }) {
  const { capture } = usePosthog();
  const { data } = BookmarkReactQueryAdapter.client.useGetBookmarks({});

  const isBookMarked = useMemo(() => data?.bookmarks?.some(bookmark => bookmark === projectId), [data, projectId]);

  const { mutate: addBookmark } = BookmarkReactQueryAdapter.client.useAddBookmark({
    options: {
      onSuccess: () => {
        capture("project_bookmark_added", { projectId });
        toast.success(`${projectName} added to bookmarks`);
      },
      onError: () => {
        toast.error(`Failed to add ${projectName} to bookmarks`);
      },
    },
  });

  const { mutate: removeBookmark } = BookmarkReactQueryAdapter.client.useRemoveBookmark({
    options: {
      onSuccess: () => {
        capture("project_bookmark_removed", { projectId });
        toast.success(`${projectName} removed from bookmarks`);
      },
      onError: () => {
        toast.error(`Failed to remove ${projectName} from bookmarks`);
      },
    },
  });

  function toggleBookmark() {
    if (isBookMarked) {
      removeBookmark({ projectId });
    } else {
      addBookmark({ projectId });
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" className="px-2" onClick={toggleBookmark}>
          <Bookmark className={cn({ "fill-purple-500 stroke-purple-500": isBookMarked })} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isBookMarked ? "Remove from bookmarks" : "Bookmark this project to access it quickly from the menu"}
      </TooltipContent>
    </Tooltip>
  );
}

export function PageHeader({ projectSlug }: PageHeaderProps) {
  const { data: project, isLoading } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (
    <div className="flex w-full flex-col bg-background pt-6">
      <ImageBanner isLoading={isLoading} image={project?.logoUrl} className="h-44 w-full rounded-xl" />
      <div className="relative z-[2] -mt-16 mb-6 ml-2 flex flex-row items-end justify-between tablet:ml-6">
        <Avatar className="h-32 w-32 rounded-xl border-4 border-background bg-background">
          <AvatarImage src={project?.logoUrl} alt={project?.name} className="h-full w-full object-cover" />
          <AvatarFallback>
            <img className="h-full w-full object-cover" src={onlydustLogoSpace?.src} alt={project?.name} />
          </AvatarFallback>
        </Avatar>

        <div className="flex items-center justify-end gap-3 tablet:hidden">
          {project?.id && <BookMarkButton projectId={project?.id} projectName={project?.name} />}
          <ActionHeader />
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 px-0">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-1">
            <TypographyH2>{project?.name}</TypographyH2>
            <div className="hidden items-center justify-end gap-3 tablet:flex">
              {project?.id && <BookMarkButton projectId={project?.id} projectName={project?.name} />}
              <ActionHeader />
            </div>
          </div>
          <TypographyP className="text-muted-foreground">{project?.shortDescription}</TypographyP>
        </div>
        <div className="flex flex-row flex-wrap divide-x">
          <Categories categories={project?.categories?.map(category => category.name) ?? []} />
          <Languages languages={project?.languages ?? []} />
          <Leads leads={project?.leads ?? []} />
        </div>
        <div className="flex flex-row flex-wrap justify-between gap-4">
          <Stats project={project} />

          <div className={"flex flex-row flex-wrap gap-2"}>
            {project?.moreInfos?.map(moreInfoItem => (
              <ProjectMoreInfo key={moreInfoItem.url} moreInfoItem={moreInfoItem} buttonProps={{ size: "xs" }} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full px-0 py-8">
        <ProjectNavigation params={{ projectSlug }} />
      </div>
    </div>
  );
}
