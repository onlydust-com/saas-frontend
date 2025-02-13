import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";
import { ProjectListItemInterfaceV2 } from "@/core/domain/project/models/project-list-item-model-v2";

import { CardProjectMarketplaceLoading } from "@/design-system/molecules/cards/card-project-marketplace";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Markdown } from "@/shared/features/markdown/markdown";
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
  ...props
}: ProjectListItemInterfaceV2 & React.HTMLAttributes<HTMLDivElement>) => (
  <Card className="flex flex-col gap-2 p-2 hover:cursor-pointer hover:bg-background-primary-hover" {...props}>
    <div className="flex flex-row gap-2">
      <Avatar>
        <AvatarImage src={logoUrl} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <TypographySmall>{name}</TypographySmall>
        <TypographyMuted>{shortDescription}</TypographyMuted>
      </div>
    </div>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-1">
        {categories.map(category => (
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
        ))}{" "}
      </div>
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
  onOpenContribution,
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

  const renderProjects = useCallback(() => {
    if (isProjectsLoading) {
      return Array.from({ length: 4 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isProjectsError) {
      return (
        <div className="col-span-full py-40">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return null;
    }

    return (
      <div className="flex flex-col gap-2">
        {projects.map(project => (
          <ProjectCard {...project} key={project.id} onClick={() => onOpenProject(project.id)} />
        ))}
      </div>
    );
  }, [projects, isProjectsError, isProjectsLoading]);

  const renderIssues = useCallback(() => {
    if (isIssuesLoading) {
      return Array.from({ length: 4 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isIssuesError) {
      return (
        <div className="col-span-full py-40">
          <ErrorState />
        </div>
      );
    }

    if (!issues.length) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {issues.map(contribution => (
          <CardContributionKanban
            classNames={{ base: "bg-background hover:bg-background-secondary-hover" }}
            contribution={contribution}
            key={contribution.id}
            onAction={onOpenContribution}
            as={ContributionAs.CONTRIBUTOR}
          />
        ))}
      </div>
    );
  }, [issues, isIssuesError, isIssuesLoading]);

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
        className={`flex flex-col gap-4 rounded-lg p-2 ${variant === "user" ? "bg-background-brand-secondary" : "bg-background-secondary"}`}
        role="text"
      >
        {content ? <Markdown content={content} /> : <Thinking />}
        {renderProjects()}
        {renderIssues()}
        {followUpMessage && <Markdown content={followUpMessage} />}
      </div>
    </div>
  );
}
