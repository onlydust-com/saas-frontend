"use client";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { IssueItemProps } from "./issue-item.types";

export function IssueItem({ issueId }: IssueItemProps) {
  const { data: issue } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
    options: { enabled: !!issueId },
  });

  if (!issue) return null;

  return (
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
      selectedLabels={[]}
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
  );
}
