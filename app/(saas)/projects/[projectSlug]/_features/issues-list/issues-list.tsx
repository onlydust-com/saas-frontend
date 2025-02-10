"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ScrollArea } from "@/shared/ui/scroll-area";

interface IssuesListProps {
  projectId: string;
  type: "bug" | "feature" | "good-first-issue";
}

export function IssuesList({ projectId, type }: IssuesListProps) {
  const { data: issues } = ProjectReactQueryAdapter.client.useGetProjectIssues({
    pathParams: {
      projectIdOrSlug: projectId,
    },
    queryParams: {
      type,
      limit: 5,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  if (!issues?.length) {
    return <div className="text-center text-sm text-muted-foreground">No issues found</div>;
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-2">
        {issues.map(issue => (
          <a
            key={issue.id}
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-border p-3 hover:bg-muted/50"
          >
            <div className="line-clamp-2 text-sm">{issue.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              #{issue.number} opened by {issue.author}
            </div>
          </a>
        ))}
      </div>
    </ScrollArea>
  );
}
