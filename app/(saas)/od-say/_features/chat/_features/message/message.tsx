import { useCallback, useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban";
import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Markdown } from "@/shared/features/markdown/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { MessageProps, messageVariants } from "./message.types";

const Thinking = () => (
  <div className="flex items-center font-mono">
    <span className="animate-pulse">.</span>
    <span className="animate-pulse delay-300">.</span>
    <span className="animate-pulse delay-500">.</span>
  </div>
);

export default function Message({ author, content, timestamp, variant, projectIds, issueIds }: MessageProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

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
      <div className="ml-12 mr-auto grid w-fit grid-cols-2 flex-row gap-2 self-center rounded-lg rounded-tl-none bg-secondary p-2 text-secondary-foreground shadow">
        {projects.map(project => (
          <CardProjectMarketplace
            classNames={{ base: "bg-background" }}
            key={project.id}
            as={BaseLink}
            htmlProps={{
              href: NEXT_ROUTER.projects.details.root(project.slug),
            }}
            name={project.name}
            slug={project.slug}
            description={project.shortDescription}
            logoUrl={project.logoUrl}
            contributorCount={project.contributorCount}
            starCount={project.starCount}
            forkCount={project.forkCount}
            availableIssueCount={project.availableIssueCount}
            goodFirstIssueCount={project.goodFirstIssueCount}
            categories={project.categories}
            languages={project.languages}
            ecosystems={project.ecosystems}
            tags={project.tags}
          />
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
      <div className="ml-12 mr-auto grid w-fit grid-cols-2 flex-row gap-2 self-center rounded-lg rounded-tl-none bg-secondary p-2 text-secondary-foreground shadow">
        {issues.map(contribution => (
          <CardContributionKanban
            classNames={{ base: "bg-background" }}
            key={contribution.id}
            type={contribution.type}
            githubTitle={contribution.githubTitle}
            githubStatus={contribution.githubStatus}
            githubNumber={contribution.githubNumber}
            lastUpdatedAt={contribution.lastUpdatedAt}
            rewardUsdAmount={contribution.totalRewardedUsdAmount}
            applicants={contribution.isNotAssigned() ? contribution.applicants : []}
            contributors={contribution.contributors}
            linkedIssues={contribution.linkedIssues}
            githubLabels={contribution.githubLabels}
            githubHtmlUrl={contribution.githubHtmlUrl}
          />
        ))}
      </div>
    );
  }, [issues, isIssuesError, isIssuesLoading]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={`flex items-center gap-2 ${variant === "user" ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar>
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>{author.login}</AvatarFallback>
        </Avatar>
        <TypographySmall>{author.login}</TypographySmall>
        <TypographyMuted className={variant === "user" ? "mr-auto" : "ml-auto"}>
          {dateKernelPort.formatDistanceToNow(timestamp)}
        </TypographyMuted>
      </div>
      <div className={cn(messageVariants({ variant }))}>{content ? <Markdown content={content} /> : <Thinking />}</div>
      {renderProjects()}
      {renderIssues()}
    </div>
  );
}
