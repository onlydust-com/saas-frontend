"use client";

import { FolderOpen } from "lucide-react";
import { useMemo, useState } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubLabelWithCountInterface } from "@/core/domain/github/models/github-label-model";
import { HackathonListItemInterface } from "@/core/domain/hackathon/models/hackathon-list-item-model";
import { ProjectAvailableIssuesInterface } from "@/core/domain/project/models/project-available-issues-model";
import { GetProjectAvailableIssuesQueryParams } from "@/core/domain/project/project-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProjectIssuesPage({
  params,
  searchParams,
}: {
  params: { projectSlug: string };
  searchParams: { l: string; h: string };
}) {
  const { open } = useApplyIssueSidePanel();

  const [selectedLabels, setSelectedLabels] = useState<GithubLabelWithCountInterface[]>(() => {
    const labels = searchParams.l?.split(",").filter(Boolean) || [];

    return labels.map(name => ({ name })) as GithubLabelWithCountInterface[];
  });

  const [selectedHackathons, setSelectedHackathons] = useState<HackathonListItemInterface[]>(() => {
    const hackathons = searchParams.h?.split(",").filter(Boolean) || [];

    return hackathons.map(id => ({ id })) as HackathonListItemInterface[];
  });

  const { data: hackathons } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const liveHackathons = useMemo(
    () => hackathons?.hackathons.filter(hackathon => hackathon.isLive()) ?? [],
    [hackathons]
  );

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
    hackathonId: selectedHackathons[0]?.id,
  };

  const {
    data: issuesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
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

  function handleHackathonClick(hackathon: HackathonListItemInterface) {
    setSelectedHackathons(prev => {
      const next = prev.some(h => h.id === hackathon.id)
        ? prev.filter(h => h.id !== hackathon.id)
        : [...prev, hackathon];

      const params = new URLSearchParams(window.location.search);

      const hackathons = next.map(h => h.id);

      if (hackathons.length) {
        params.set("h", hackathons.join(","));
      } else {
        params.delete("h");
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
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: data?.id,
          project_id: data?.id,
          type: "full",
          issues: data?.availableIssueCount,
          tab: "issues",
        }}
        paramsReady={Boolean(data)}
      />

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
        {labels.length || liveHackathons.length ? (
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

            {labels?.length > 0 && liveHackathons?.length > 0 ? (
              <div className="h-8 border-l border-border-primary" />
            ) : null}

            {liveHackathons?.map(hackathon => (
              <Badge
                key={hackathon.slug}
                size="md"
                onClick={() => handleHackathonClick(hackathon)}
                color={selectedHackathons.some(h => h.id === hackathon.id) ? "brand" : "grey"}
              >
                {hackathon.title}
              </Badge>
            ))}
          </div>
        ) : null}
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
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
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
