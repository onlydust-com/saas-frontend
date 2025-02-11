"use client";

import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { AnyType } from "@/core/kernel/types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/utils";

import { ContributionGraph } from "../_features/contribution-graph/contribution-graph";
import { Description } from "./_features/description/description";
import { RelatedProjects } from "./_features/related/related";

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

function IssueCard({ issue }: { issue: AnyType }) {
  return (
    <Link
      href={issue.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-background-secondary transition-colors hover:bg-muted/50"
    >
      <div className="flex items-start gap-3 rounded-lg border p-3">
        <CircleIcon className="mt-1 h-4 w-4 text-muted-foreground" />
        <div className="flex-1 space-y-1">
          <h4 className="font-medium leading-none">{issue.title}</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>#{issue.number}</span>
            <span>•</span>
            <span>opened by {issue.author.login}</span>
          </div>
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {issue.labels.map((label: AnyType) => (
                <Badge key={label.name} variant="outline" className="text-xs">
                  {label.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function IssuesSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="mt-1 h-4 w-4 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectOverviewPage({ params }: { params: { projectSlug: string } }) {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading: isLoadingProject } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const {
    data: issuesData,
    isLoading: isLoadingIssues,
    error: issuesError,
  } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    queryParams: {},
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  if (!data && !isLoadingProject) return null;

  const latestIssues = issuesData?.pages[0]?.issues.slice(0, 3) || [];
  const goodFirstIssues =
    issuesData?.pages[0]?.issues
      .filter(issue => issue.labels.some(label => label.name.toLowerCase() === "good first issue"))
      .slice(0, 3) || [];
  const featureIssues =
    issuesData?.pages[0]?.issues
      .filter(issue => issue.labels.some(label => label.name.toLowerCase() === "feature"))
      .slice(0, 3) || [];

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col items-start justify-start gap-4 laptop:h-full laptop:flex-row">
        {/* <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-0 laptop:w-[440px] laptop:min-w-[440px]">
          <ProjectOverviewSummary projectIdOrSlug={params.projectSlug} />
        </div> */}

        <PosthogCaptureOnMount
          eventName={"project_viewed"}
          params={{
            id_project: data?.id,
            project_id: data?.id,
            type: "full",
            issues: data?.availableIssueCount,
            tab: "overview",
          }}
          paramsReady={Boolean(data)}
        />

        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Projects",
              href: NEXT_ROUTER.projects.root,
            },
            {
              id: "name",
              label: data?.name,
            },
            {
              id: "overview",
              label: "Overview",
            },
          ]}
        />

        <div className="grid grid-cols-1 gap-6">
          <Card className={cn("relative h-[500px] overflow-hidden p-6", showAll && "h-fit transition-all")}>
            {/* Documentation */}
            {isLoadingProject ? (
              <Skeleton className="h-32 w-full" />
            ) : data?.longDescription ? (
              <Description description={data.longDescription} />
            ) : (
              <div className="text-sm text-muted-foreground">No documentation available</div>
            )}
            {!showAll && (
              <div className="absolute bottom-0 left-0 right-0 flex h-[500px] items-end justify-center bg-gradient-to-t from-background to-transparent pb-6">
                <Button size="sm" variant={"ghost"} onClick={() => setShowAll(true)}>
                  Show all
                </Button>
              </div>
            )}
            {showAll && (
              <div className="flex h-fit w-full items-end justify-center pb-6">
                <Button size="sm" variant={"ghost"} onClick={() => setShowAll(false)}>
                  Show less
                </Button>
              </div>
            )}
          </Card>

          {/* Issues Section */}
          <Card className="space-y-12 bg-background-secondary p-6">
            {/* <Card className="space-y-12 border border-none bg-transparent p-6"> */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Open Issues</h2>
                <p className="text-sm text-muted-foreground">
                  Browse through available issues, features, and good first issues
                </p>
              </div>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Open Issues */}
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Issues ({data?.availableIssueCount ?? "..."})</h3>
                </div>
                {isLoadingIssues ? (
                  <IssuesSkeleton />
                ) : issuesError ? (
                  <div className="text-center text-sm text-destructive">Failed to load issues</div>
                ) : latestIssues.length > 0 ? (
                  <div className="space-y-4">
                    {latestIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                ) : (
                  <div className="text-left text-sm text-muted-foreground">No issues found</div>
                )}
              </Card>

              {/* Features */}
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Features ({featureIssues.length})</h3>
                  {featureIssues.length > 0 && (
                    <Link
                      href={`/projects/${params.projectSlug}/issues?l=feature`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      View all
                    </Link>
                  )}
                </div>
                {isLoadingIssues ? (
                  <IssuesSkeleton />
                ) : issuesError ? (
                  <div className="text-left text-sm text-destructive">Failed to load features</div>
                ) : featureIssues.length > 0 ? (
                  <div className="space-y-4">
                    {featureIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                ) : (
                  <div className="text-left text-sm text-muted-foreground">No features found</div>
                )}
              </Card>

              {/* Good First Issues */}
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Good First Issues ({data?.goodFirstIssueCount ?? "..."})</h3>
                  {goodFirstIssues.length > 0 && (
                    <Link
                      href={`/projects/${params.projectSlug}/issues?l=good first issue`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      View all
                    </Link>
                  )}
                </div>
                {isLoadingIssues ? (
                  <IssuesSkeleton />
                ) : issuesError ? (
                  <div className="text-left text-sm text-destructive">Failed to load good first issues</div>
                ) : goodFirstIssues.length > 0 ? (
                  <div className="space-y-4">
                    {goodFirstIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                ) : (
                  <div className="text-left text-sm text-muted-foreground">No good first issues found</div>
                )}
              </Card>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            {data?.languages && Object.keys(data.languages).length > 0 && (
              <Card className="col-span-1 p-6">
                <h3 className="mb-4 text-lg font-semibold">Languages</h3>
                <div className="space-y-3">
                  {Object.entries(data.languages || {}).map(([language, { name, percentage, color, logoUrl }]) => (
                    <div key={language} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {logoUrl && (
                            <img src={logoUrl} alt={`${language} logo`} width={16} height={16} className="h-4 w-4" />
                          )}
                          <span>{name}</span>
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
            <div className="col-span-2">
              <ContributionGraph />
            </div>
          </div>

          <Card className="p-6">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">See the latest activity on the project</p>
              </div>
            </div>
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

          <RelatedProjects projectIdOrSlug={params.projectSlug} />
        </div>
      </div>
    </ScrollArea>
  );
}

export default ProjectOverviewPage;
