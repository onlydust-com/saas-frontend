"use client";

import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { CardIssue } from "@/design-system/molecules/cards/card-issue";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useApplyIssueSidePanel } from "@/shared/panels/apply-issue-sidepanel/apply-issue-sidepanel.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { CardDescription } from "@/shared/ui/card";
import { TypographyH3 } from "@/shared/ui/typography";

function MyApplicationsPage({ params }: { params: { hackathonSlug: string } }) {
  const { open } = useApplyIssueSidePanel();
  const { githubUserId } = useAuthUser();

  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug: params.hackathonSlug,
    },
    options: {
      enabled: Boolean(params.hackathonSlug),
    },
  });

  const { data: issuesData } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      applicantIds: githubUserId ? [githubUserId] : [],
      hackathonId: hackathon?.id,
    },
    options: {
      enabled: !!githubUserId && !!hackathon?.id,
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.contributions) ?? [], [issuesData]);

  const assignedIssues = issues.filter(issue => !issue.isNotAssigned());
  const notAssignedIssues = issues.filter(issue => issue.isNotAssigned());

  function handleIssueClick(issue: ContributionActivityInterface) {
    open({ contributionUuid: issue.id, projectId: "onlydust" });
  }

  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Open-Source Week",
            href: NEXT_ROUTER.osw.root,
          },
          {
            id: "slug",
            label: params.hackathonSlug,
          },
          {
            id: "my-applications",
            label: "My applications",
          },
        ]}
      />

      <div className="flex flex-col gap-4">
        <div className="pb-2 pt-6 lg:col-span-2 xl:col-span-3">
          <TypographyH3>Unsuccessful applications</TypographyH3>
          <CardDescription>
            These issues are already assigned to other contributors, so the chances of being assigned are low. We advise
            you to apply to other issues.
          </CardDescription>
        </div>

        {assignedIssues.length ? (
          assignedIssues.map(issue => (
            <CardIssue
              key={issue.id}
              title={issue.githubTitle}
              onClick={() => handleIssueClick(issue)}
              contribution={{
                type: "ISSUE",
                githubStatus: issue.githubStatus,
                number: issue.githubNumber,
              }}
              createdAt={issue.createdAt}
              users={issue.applicants.map(a => ({
                login: a.login,
                avatarUrl: a.avatarUrl,
              }))}
              createdBy={{
                login: issue.githubAuthor.login,
                avatarUrl: issue.githubAuthor.avatarUrl,
              }}
              repo={{
                name: issue.repo.name,
                url: issue.repo.htmlUrl,
              }}
            />
          ))
        ) : (
          <EmptyStateLite />
        )}

        <div className="pb-2 pt-6 lg:col-span-2 xl:col-span-3">
          <TypographyH3>Applications under review</TypographyH3>
          <CardDescription>These issues are not assigned to a contributor yet.</CardDescription>
        </div>
        {notAssignedIssues.length ? (
          notAssignedIssues.map(issue => (
            <CardIssue
              key={issue.id}
              title={issue.githubTitle}
              onClick={() => handleIssueClick(issue)}
              contribution={{
                type: "ISSUE",
                githubStatus: issue.githubStatus,
                number: issue.githubNumber,
              }}
              createdAt={issue.createdAt}
              users={issue.applicants.map(a => ({
                login: a.login,
                avatarUrl: a.avatarUrl,
              }))}
              createdBy={{
                login: issue.githubAuthor.login,
                avatarUrl: issue.githubAuthor.avatarUrl,
              }}
              repo={{
                name: issue.repo.name,
                url: issue.repo.htmlUrl,
              }}
            />
          ))
        ) : (
          <EmptyStateLite />
        )}
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(MyApplicationsPage));
