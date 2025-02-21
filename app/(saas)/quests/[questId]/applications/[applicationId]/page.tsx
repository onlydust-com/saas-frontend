"use client";

import { useQuery } from "@tanstack/react-query";

import { QuestListData } from "@/app/(saas)/quests/_data/quest-list.data";
import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

import { QuestReactQueryAdapter } from "@/core/application/react-query-adapter/quest";
import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { withQuestLead } from "../_components/with-quest-lead";
import { IssueList } from "./_components/issue-list/issue-list";
import { Section } from "./_components/section/section";
import { ActivityGraph } from "./_features/activity-graph/activity-graph";
import { ApplicationFunnel } from "./_features/application-funnel/application-funnel";
import { FilloutResponse } from "./_features/fillout-response/fillout-response";
import { Languages } from "./_features/languages/languages";
import { PageHeader } from "./_features/page-header/page-header";
import { RecentActivity } from "./_features/recent-activity/recent-activity";
import { Projects } from "./_features/similar-projects/projects";

const fetchSubmissionDetails = async (submissionId: string): Promise<Submission> => {
  const response = await fetch(NEXT_ROUTER.api.fillout.forms.submissions.details.root("7nGf4YdHqzus", submissionId));
  const data = await response.json();
  return data.data;
};

function QuestApplicationPage({ params }: { params: { questId: string; applicationId: string } }) {
  const { data: submission } = useQuery({
    queryKey: ["submissionDetails", params.applicationId],
    queryFn: () => fetchSubmissionDetails(params.applicationId),
    staleTime: 5000,
  });
  const { urlParameters } = submission ?? {};
  const githubLogin = urlParameters?.find(param => param.name === "github_login")?.value ?? "";

  const { data: user } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: {
      slug: githubLogin,
    },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const { data: questData } = QuestReactQueryAdapter.client.useGetQuestContributor({
    pathParams: {
      questId: params.questId,
      githubLogin,
    },
    options: {
      enabled: Boolean(githubLogin),
    },
  });

  const githubId = user?.githubUserId ?? 0;

  const quest = QuestListData.find(quest => quest.id === params.questId);

  // const note =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

  return (
    <PageContainer size="small" className="flex-1">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Quests",
            href: NEXT_ROUTER.quests.root,
          },
          {
            id: "quest",
            label: quest?.name ?? "",
            href: NEXT_ROUTER.quests.details.root(params.questId),
          },
          {
            id: "applications",
            label: "Applications",
            href: NEXT_ROUTER.quests.details.applications.root(params.questId),
          },
          {
            id: "user",
            label: githubLogin,
          },
        ]}
      />

      <PageHeader githubLogin={githubLogin} />

      <div className="grid w-full grid-cols-1 gap-8 overflow-hidden pt-6 lg:grid-cols-4">
        <div className="col-span-full">
          <FilloutResponse submission={submission} />
        </div>

        {/* <div className="col-span-full">
          <DevCareNote>{note}</DevCareNote>
        </div> */}

        <div className="col-span-full">
          <Section title="Contributor overview">
            <div className="grid w-full grid-cols-1 gap-8 overflow-hidden lg:grid-cols-4">
              <div className="grid lg:col-span-1">
                <Languages githubLogin={githubLogin} />
              </div>
              <div className="grid lg:col-span-3">
                <ActivityGraph githubLogin={githubLogin} />
              </div>
            </div>
          </Section>
        </div>

        <div className="col-span-full">
          <Section title="Contributor technical skills">
            <div className="grid w-full grid-cols-1 gap-8 overflow-hidden lg:grid-cols-4">
              <div className="grid lg:col-span-2">
                <IssueList
                  containerClassName="bg-gradient-to-br from-green-950 to-transparent to-50%"
                  title="Most complex PRs"
                  emptyMessage="No pr found"
                  errorMessage="Error loading pr"
                  description="These pull requests were the most complex to complete."
                  issues={
                    questData?.techSkills?.biggestPRsOnRequiredTechSkills?.map(pr => ({
                      githubStatus: pr.githubStatus,
                      justifications: pr.justification ?? "",
                      languages: pr.languages ?? [],
                      number: pr.githubNumber,
                      score: pr.score ?? 0,
                      title: pr.githubTitle ?? "",
                      url: pr.githubHtmlUrl ?? "",
                      type: pr.type,
                      uuid: pr.contributionUuid ?? "",
                    })) ?? []
                  }
                />
              </div>

              <div className="grid lg:col-span-2">
                <IssueList
                  containerClassName="bg-gradient-to-br from-red-950 to-transparent to-50%"
                  title="PRs with the most friction"
                  emptyMessage="No pr found"
                  errorMessage="Error loading pr"
                  description="These pull requests had a lot of back and forth to accomplish the task."
                  issues={
                    questData?.commitment?.overallPRWithMostFriction?.map(pr => ({
                      githubStatus: pr.githubStatus,
                      justifications: pr.justification ?? "",
                      languages: pr.languages ?? [],
                      number: pr.githubNumber,
                      score: pr.score ?? 0,
                      title: pr.githubTitle ?? "",
                      url: pr.githubHtmlUrl ?? "",
                      type: pr.type,
                      uuid: pr.contributionUuid ?? "",
                    })) ?? []
                  }
                />
              </div>
            </div>
          </Section>
        </div>

        <div className="col-span-full">
          <Section title="Contributor commitment">
            <div className="grid w-full grid-cols-1 gap-8 overflow-hidden lg:grid-cols-4">
              <div className="col-span-full grid">
                <ApplicationFunnel
                  issueAppliedCount={questData?.commitment?.issueAppliedCount ?? 0}
                  issueAssignedCount={questData?.commitment?.issueAssignedCount ?? 0}
                  issueCompletedCount={questData?.commitment?.issueCompletedCount ?? 0}
                />
              </div>
            </div>
          </Section>
        </div>

        <div className="col-span-full">
          <Section title="Contributor activity">
            <div className="grid w-full grid-cols-1 gap-8 overflow-hidden lg:grid-cols-4">
              <div className="grid lg:col-span-2">
                <RecentActivity githubId={githubId} />
              </div>

              <div className="grid lg:col-span-2">
                <Projects githubLogin={githubLogin} />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </PageContainer>
  );
}
export default withAuthenticated(withQuestLead(QuestApplicationPage));
