import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { GitFork, MessageSquare, Star, User } from "lucide-react";
import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { ProjectListItemInterfaceV2 } from "@/core/domain/project/models/project-list-item-model-v2";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Markdown } from "@/shared/features/markdown/markdown";
import { IssueSidepanel } from "@/shared/panels/issue-sidepanel/issue-sidepanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { MessageProps } from "./message.types";

const Thinking = () => (
  <div className="flex items-center font-mono">
    <span className="animate-pulse">.</span>
    <span className="animate-pulse delay-300">.</span>
    <span className="animate-pulse delay-500">.</span>
  </div>
);

const ProjectCard = ({
  name,
  logoUrl,
  shortDescription,
  categories,
  languages,
  starCount,
  forkCount,
  contributorCount,
  ...props
}: ProjectListItemInterfaceV2 & React.HTMLAttributes<HTMLDivElement>) => (
  <Card className="flex flex-col gap-2 p-2 hover:cursor-pointer hover:bg-background-primary-hover" {...props}>
    <div className="flex flex-row gap-2">
      <Avatar>
        <AvatarImage src={logoUrl} />
        <AvatarFallback>
          <img className="h-full w-full object-cover" src={onlydustLogoSpace?.src} alt={name} />
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-row items-center">
          <TypographySmall>{name}</TypographySmall>
          <div className="ml-auto flex flex-row items-center gap-1.5 text-xs">
            {forkCount ? (
              <div className="flex flex-row items-center gap-0.5">
                <GitFork className="h-3.5 w-3.5" />
                <span>{forkCount}</span>
              </div>
            ) : null}
            {starCount ? (
              <div className="flex flex-row items-center gap-0.5">
                <Star className="h-4 w-4" />
                <span>{starCount}</span>
              </div>
            ) : null}
            {contributorCount ? (
              <div className="flex flex-row items-center gap-0.5">
                <User className="h-4 w-4" />
                <span>{contributorCount}</span>
              </div>
            ) : null}
          </div>
        </div>
        <TypographyMuted>{shortDescription}</TypographyMuted>
      </div>
    </div>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-1">
        {categories.slice(0, 3).map(category => (
          <Badge key={category.name} variant="outline">
            {category.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-row items-center gap-1">
        {languages.map(language => (
          <Avatar className="size-5" key={language.name}>
            <AvatarImage src={language.logoUrl} />
            <AvatarFallback>{language.name}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  </Card>
);

const IssueCard = ({
  githubStatus,
  type,
  githubNumber,
  githubTitle,
  githubBody,
  githubLabels,
  project,
  applicants,
  githubCommentCount,
  ...props
}: ContributionActivityInterface & React.HTMLAttributes<HTMLDivElement>) => (
  <Card className="flex flex-col gap-4 p-2 hover:cursor-pointer hover:bg-background-primary-hover" {...props}>
    <div className="flex w-full flex-row items-center gap-2">
      <ContributionBadge type={type} number={githubNumber} githubStatus={githubStatus} />
      <TypographySmall className="line-clamp-1">{githubTitle}</TypographySmall>
      <div className="ml-auto flex flex-row items-center gap-1.5">
        {githubCommentCount ? (
          <div className="flex flex-row items-center gap-0.5">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-xs">{githubCommentCount}</span>
          </div>
        ) : null}
        {applicants?.length ? (
          <div className="flex flex-row items-center gap-0.5">
            <User className="h-3.5 w-3.5" />
            <span className="text-xs">{applicants.length}</span>
          </div>
        ) : null}
      </div>
    </div>
    {githubBody ? (
      <TypographyMuted className="line-clamp-3">{githubBody}</TypographyMuted>
    ) : (
      <TypographyMuted className="italic">No description provided</TypographyMuted>
    )}
    <div className="mt-auto flex flex-row justify-between">
      <div className="flex flex-row gap-1">
        {githubLabels?.slice(0, 3).map(label => (
          <Badge key={label.name} variant="outline">
            {label.name}
          </Badge>
        ))}
      </div>
      <Avatar className="size-5">
        <AvatarImage src={project?.logoUrl} />
        <AvatarFallback>{project?.name}</AvatarFallback>
      </Avatar>
    </div>
  </Card>
);

export default function Message({
  author,
  content,
  variant,
  projectIds,
  issueIds,
  followUpMessage,
  onOpenProject,
}: MessageProps) {
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: { pageSize: 4, projectIds: projectIds ?? [] },
    options: {
      enabled: !!projectIds?.length,
    },
  });

  const {
    data: issuesData,
    isLoading: isIssuesLoading,
    isError: isIssuesError,
  } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      ids: issueIds ?? [],
      pageSize: 4,
    },
    options: {
      enabled: !!issueIds?.length,
    },
  });

  const projects = useMemo(() => projectsData?.pages.flatMap(({ projects }) => projects) ?? [], [projectsData]);

  const issues = useMemo(() => issuesData?.pages.flatMap(({ contributions }) => contributions) ?? [], [issuesData]);

  const renderProjects = useCallback(
    () => (
      <div className="flex flex-col gap-2">
        {projects.map(project => (
          <ProjectCard {...project} key={project.id} onClick={() => onOpenProject(project.id)} />
        ))}
      </div>
    ),
    [projects, isProjectsError, isProjectsLoading]
  );

  const renderIssues = useCallback(
    () => (
      <div className="flex flex-col gap-2">
        {issues.map(contribution => (
          <IssueSidepanel
            key={contribution.id}
            projectId={contribution.project?.id ?? ""}
            contributionUuid={contribution.id}
          >
            <IssueCard {...contribution} />
          </IssueSidepanel>
        ))}
      </div>
    ),
    [issues, isIssuesError, isIssuesLoading]
  );

  return (
    <div
      className={`flex w-full gap-2 ${variant === "user" ? "flex-row-reverse" : "flex-row"}`}
      role="article"
      aria-label={`Message from ${author.login}`}
    >
      <Avatar>
        <AvatarImage src={author.avatarUrl} />
        <AvatarFallback>{author.login}</AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col gap-4 rounded-lg p-2 ${variant === "user" ? "bg-background-brand-secondary" : "bg-background-secondary-hover"}`}
        role="text"
      >
        {content ? <Markdown content={content} /> : <Thinking />}
        {issues.length > 0 ? renderIssues() : projects.length > 0 ? renderProjects() : null}
        {(issues.length > 0 || projects.length > 0) && followUpMessage ? <Markdown content={followUpMessage} /> : null}
      </div>
    </div>
  );
}
