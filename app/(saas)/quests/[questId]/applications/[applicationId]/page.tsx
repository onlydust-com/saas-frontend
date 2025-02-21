"use client";

import { PageContainer } from "@/shared/features/page/page-container/page-container";

import { IssueList } from "./_components/issue-list/issue-list";
import { IssueListProps } from "./_components/issue-list/issue-list.types";
import { ActivityGraph } from "./_features/activity-graph/activity-graph";
import { ApplicationFunnel } from "./_features/application-funnel/application-funnel";
import { DevCareNote } from "./_features/dev-care-note/dev-care-note";
import { FilloutResponse } from "./_features/fillout-response/fillout-response";
import { Languages } from "./_features/languages/languages";
import { PageHeader } from "./_features/page-header/page-header";
import { RecentActivity } from "./_features/recent-activity/recent-activity";
import { Projects } from "./_features/similar-projects/projects";

const mockPr: IssueListProps["issues"][number] = {
  type: "PULL_REQUEST",
  githubStatus: "MERGED",
  number: 555,
  title: "Biggest pr on tech skill",
  createdAt: "2021-01-01",
  url: "https://github.com/alexbeno/test/pull/555",
  justifications: "We choose this pr because it is the biggest pr on tech skill",
  languages: [
    {
      logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
      name: "Typescript",
    },
  ],
} as const;

export default function QuestApplicationPage({ params }: { params: { applicationId: string } }) {
  // 1, contributor detail + metrics
  // 2, contributor scoring from backend
  // 3, devcare team contributor review
  // 4, application detail from fillout (reponse aux question de la quest)
  const login = "alexbeno";
  const githubId = 17259618;
  const note =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

  return (
    <PageContainer size="small" className="flex-1">
      <PageHeader githubLogin={login} />

      <div className="grid w-full grid-cols-1 gap-6 overflow-hidden pt-6 lg:grid-cols-4">
        <div className="grid lg:col-span-1">
          <Languages githubLogin={login} />
        </div>
        <div className="grid lg:col-span-3">
          <ActivityGraph githubLogin={login} />
        </div>

        <div className="grid lg:col-span-2">
          <IssueList
            containerClassName="bg-gradient-to-br from-green-950 to-transparent to-50%"
            title="Biggest pr on tech skill"
            emptyMessage="No pr found"
            errorMessage="Error loading pr"
            description="These are the biggest pr on tech skill"
            issues={[mockPr, mockPr, mockPr]}
          />
        </div>

        <div className="grid lg:col-span-2">
          <IssueList
            containerClassName="bg-gradient-to-br from-blue-950 to-transparent to-50%"
            title="Overall biggest pr"
            emptyMessage="No pr found"
            errorMessage="Error loading pr"
            description="These are the overall biggest pr"
            issues={[mockPr, mockPr, mockPr]}
          />
        </div>

        <div className="grid lg:col-span-2">
          <IssueList
            title="Most collaborative pr"
            emptyMessage="No pr found"
            errorMessage="Error loading pr"
            description="These are the most collaborative pr"
            issues={[mockPr, mockPr, mockPr]}
          />
        </div>

        <div className="grid lg:col-span-2">
          <ApplicationFunnel issueAppliedCount={10} issueAssignedCount={5} issueCompletedCount={2} />
        </div>

        <div className="col-span-full">
          <DevCareNote>{note}</DevCareNote>
        </div>

        <div className="col-span-full">
          <FilloutResponse applicationId={params.applicationId} />
        </div>

        <div className="grid lg:col-span-2">
          <RecentActivity githubId={githubId} />
        </div>

        <div className="grid lg:col-span-2">
          <Projects githubLogin={login} />
        </div>
      </div>
    </PageContainer>
  );
}
