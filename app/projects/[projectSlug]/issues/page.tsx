"use client";

import { FolderOpen } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubLabelWithCountInterface } from "@/core/domain/github/models/github-label-model";
import { ProjectAvailableIssuesInterface } from "@/core/domain/project/models/project-available-issues-model";
import { GetProjectAvailableIssuesQueryParams } from "@/core/domain/project/project-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProjectIssuesPage({ params }: { params: { projectSlug: string } }) {
  const { open } = useApplyIssueSidePanel();

  const [selectedLabels, setSelectedLabels] = useState<GithubLabelWithCountInterface[]>(() => {
    if (typeof window === "undefined") return [];

    const params = new URLSearchParams(window.location.search);
    const labels = params.get("l")?.split(",").filter(Boolean) || [];

    return labels.map(name => ({ name })) as GithubLabelWithCountInterface[];
  });

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const queryParams: Partial<GetProjectAvailableIssuesQueryParams> = {
    githubLabels: selectedLabels.map(label => label.name),
  };

  const { data: issuesData } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    queryParams,
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.issues) ?? [], [issuesData]);
  const totalItemNumber = useMemo(() => issuesData?.pages[0]?.totalItemNumber, [issuesData]);

  const labels = useMemo(() => {
    const allLabels = issuesData?.pages.flatMap(page => page.labels) ?? [];
    return [...new Map(allLabels.map(label => [label.name, label])).values()] as GithubLabelWithCountInterface[];
  }, [issuesData]);

  function handleLabelClick(label: GithubLabelWithCountInterface) {
    setSelectedLabels(prev => {
      const next = prev.some(l => l.name === label.name) ? prev.filter(l => l.name !== label.name) : [...prev, label];

      const params = new URLSearchParams(window.location.search);

      const labels = next.map(l => l.name);
      if (labels.length) {
        params.set("l", labels.join(","));
      } else {
        params.delete("l");
      }

      window.history.replaceState(null, "", `?${params.toString()}`);

      return next;
    });
  }

  function handleIssueClick(issue: ProjectAvailableIssuesInterface) {
    open({ issueId: issue.id, projectId: data?.id ?? "" });
  }

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: data?.name,
            iconProps: {
              component: FolderOpen,
            },
          },
          {
            id: "open-issues",
            label: <Translate token={"project:details.tabs.openIssues"} />,
          },
        ]}
      />
      <div className={"flex h-full flex-col divide-y divide-border-primary overflow-hidden"}>
        <div className="flex flex-wrap gap-md p-lg">
          {labels?.map(label => (
            <Badge
              key={label.name}
              size="md"
              onClick={() => handleLabelClick(label)}
              color={selectedLabels.some(l => l.name === label.name) ? "brand" : "grey"}
            >
              {label.name} ({label.count})
            </Badge>
          ))}
        </div>
        <ScrollView direction={"x"} className="flex flex-col gap-4 p-lg">
          {!issues?.length ? (
            <EmptyState
              titleTranslate={{ token: "project:details.issues.empty.title" }}
              descriptionTranslate={{ token: "project:details.issues.empty.description" }}
            />
          ) : (
            issues.map(issue => (
              <CardIssue
                key={issue.id}
                title={issue.title}
                onClick={() => handleIssueClick(issue)}
                contribution={{
                  type: "ISSUE",
                  githubStatus: issue.status,
                  number: issue.number,
                }}
                createdAt={issue.createdAt}
                users={issue.applicants.map(a => ({
                  login: a.login,
                  avatarUrl: a.avatarUrl,
                }))}
                selectedLabels={selectedLabels.map(label => label.name)}
                githubLabels={issue.labels.map(label => ({
                  label: label.name,
                  description: label.description,
                  onClick: () =>
                    handleLabelClick({
                      ...label,
                      count: 0,
                    }),
                }))}
                createdBy={{
                  login: issue.author.login,
                  avatarUrl: issue.author.avatarUrl,
                }}
                repo={{
                  name: issue.repo.name,
                  url: issue.repo.htmlUrl,
                }}
              />
            ))
          )}
        </ScrollView>
        <div className="flex gap-md px-lg pt-xl">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "project:details.issues.issuesCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
    </ScrollView>
  );
}
