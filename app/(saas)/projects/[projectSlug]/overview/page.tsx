"use client";

import { CircleIcon } from "lucide-react";
import Link from "next/link";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { AnyType } from "@/core/kernel/types";

import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Skeleton } from "@/shared/ui/skeleton";

import { ContributionGraph } from "../_features/contribution-graph/contribution-graph";
import { ProjectOverviewSummary } from "../_features/project-details/project-overview-summary/project-overview-summary";
import { Description } from "./_features/description/description";
import { RelatedProjects } from "./_features/related/related";

function IssueCard({ issue }: { issue: AnyType }) {
  return (
    <Link
      href={issue.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-colors hover:bg-muted/50"
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
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-0 laptop:w-[440px] laptop:min-w-[440px]">
          <ProjectOverviewSummary projectIdOrSlug={params.projectSlug} />
        </div>

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

        <div className="grid grid-cols-1 gap-6">
          {/* Documentation */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-lg font-semibold">Documentation</h3>
            </div>
            {isLoadingProject ? (
              <Skeleton className="h-32 w-full" />
            ) : data?.longDescription ? (
              <Description description={data.longDescription} />
            ) : (
              <div className="text-sm text-muted-foreground">No documentation available</div>
            )}
          </Card>

          <ContributionGraph />

          {/* Issues Section */}
          <Card className="space-y-12 border border-border-primary bg-background-secondary p-6">
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
              <div>
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
              </div>

              {/* Features */}
              <div>
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
              </div>

              {/* Good First Issues */}
              <div>
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
              </div>
            </div>
          </Card>

          <RelatedProjects projectIdOrSlug={params.projectSlug} />
        </div>
      </div>
    </ScrollArea>
  );
}

export default ProjectOverviewPage;
