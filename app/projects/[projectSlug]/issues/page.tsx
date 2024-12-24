"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProjectIssuesPage({ params }: { params: { projectSlug: string } }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const { data: issuesData } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  const issues = issuesData?.pages.flatMap(page => page.issues);

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: data?.name,
          },
          {
            id: "open-issues",
            label: <Translate token={"project:details.tabs.openIssues"} />,
          },
        ]}
      />
      <div className="flex flex-col gap-4 p-4">
        {issues?.map(issue => (
          <CardIssue
            key={issue.id}
            title={issue.title}
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
            githubLabels={issue.labels.map(label => ({
              label: label.name,
              description: label.description,
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
        ))}
      </div>
    </ScrollView>
  );
}
