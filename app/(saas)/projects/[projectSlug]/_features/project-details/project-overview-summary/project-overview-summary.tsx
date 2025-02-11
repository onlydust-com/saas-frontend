"use client";

import { useCallback } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardProjectOverviewLoading } from "@/design-system/molecules/cards/card-project-overview";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { Card } from "@/shared/ui/card";

import { ProjectOverviewSummaryProps } from "./project-overview-summary.types";

const mockActivities = [
  {
    id: "1",
    type: "PULL_REQUEST" as const,
    title: "Add new authentication flow",
    author: "Sarah Chen",
    createdAt: "2 hours ago",
    githubStatus: "OPEN" as const,
    number: 1,
  },
  {
    id: "2",
    type: "ISSUE" as const,
    title: "Fix responsive layout on mobile devices",
    author: "John Doe",
    createdAt: "5 hours ago",
    githubStatus: "OPEN" as const,
    number: 1,
  },
  {
    id: "3",
    type: "CODE_REVIEW" as const,
    title: "Update dependencies to latest versions",
    author: "Mike Wilson",
    createdAt: "1 day ago",
    githubStatus: "APPROVED" as const,
    number: 1,
  },
  {
    id: "4",
    type: "PULL_REQUEST" as const,
    title: "Implement dark mode support",
    author: "Emma Thompson",
    createdAt: "2 days ago",
    githubStatus: "OPEN" as const,
    number: 1,
  },
  {
    id: "5",
    type: "ISSUE" as const,
    title: "Performance optimization for data fetching",
    author: "Alex Kumar",
    createdAt: "3 days ago",
    githubStatus: "OPEN" as const,
    number: 1,
  },
];

export function ProjectOverviewSummary({ projectIdOrSlug }: ProjectOverviewSummaryProps) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug,
    },
    options: {
      enabled: Boolean(projectIdOrSlug),
    },
  });

  const renderProject = useCallback(() => {
    if (isLoading) {
      return <CardProjectOverviewLoading />;
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!project) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-6">
        {project.languages && Object.keys(project.languages).length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Languages</h3>
            <div className="space-y-3">
              {Object.entries(project.languages).map(([language, { percentage, color, logoUrl }]) => (
                <div key={language} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {logoUrl && (
                        <img src={logoUrl} alt={`${language} logo`} width={16} height={16} className="h-4 w-4" />
                      )}
                      <span>{language}</span>
                    </div>
                    <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color || "var(--primary)", // Fallback to primary color if no color provided
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {mockActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
                <ContributionBadge
                  type={activity.type}
                  githubStatus={activity.githubStatus}
                  number={activity.number}
                  size="sm"
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.author}</span>
                    <span>•</span>
                    <span>{activity.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );

    // return (
    //   <CardProjectOverview
    //     name={project.name}
    //     logoUrl={project.logoUrl}
    //     description={project.shortDescription}
    //     contributorCount={project.contributorCount}
    //     starCount={project.starCount}
    //     forkCount={project.forkCount}
    //     categories={project.categories}
    //     languages={project.languages}
    //     moreInfos={project.moreInfos}
    //     leaders={project.leads}
    //     repos={project.repos}
    //   />
    // );
  }, [isLoading, isError, project]);

  return <div>{renderProject()}</div>;
}
