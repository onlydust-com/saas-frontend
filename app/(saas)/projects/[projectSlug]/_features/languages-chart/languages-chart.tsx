"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

interface LanguagesChartProps {
  projectId: string;
}

export function LanguagesChart({ projectId }: LanguagesChartProps) {
  const { data: languages } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectId,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  if (!languages) return null;

  return (
    <div className="space-y-2">
      {Object.entries(languages).map(([language, percentage]) => (
        <div key={language} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>{language}</span>
            <span className="text-muted-foreground">{percentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
