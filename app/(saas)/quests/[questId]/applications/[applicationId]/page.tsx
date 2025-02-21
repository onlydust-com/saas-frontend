"use client";

import { Description } from "@/app/(saas)/projects/[projectSlug]/overview/_features/description/description";

import { PageContainer } from "@/shared/features/page/page-container/page-container";

import { ActivityGraph } from "./_features/activity-graph/activity-graph";
import { DevCareNote } from "./_features/dev-care-note/dev-care-note";
import { Languages } from "./_features/languages/languages";
import { PageHeader } from "./_features/page-header/page-header";
import { RecentActivity } from "./_features/recent-activity/recent-activity";
import { Projects } from "./_features/similar-projects/projects";




import { FilloutResponse } from "./_features/fillout-response/fillout-response";

export default function QuestApplicationPage({ params }: { params: { applicationId: string } }) {
  // 1, contributor detail + metrics
  // 2, contributor scoring from backend
  // 3, devcare team contributor review
  // 4, application detail from fillout (reponse aux question de la quest)
  const login = "alexbeno";
  const githubId = 17259618;
  const note =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
  "use client";

  return (
    <PageContainer size="small" className="flex-1">
      <PageHeader githubLogin={login} />
      <FilloutResponse applicationId={params.applicationId} />
      <div className="grid w-full grid-cols-1 gap-6 overflow-hidden pt-6 lg:grid-cols-4">
        <div className="grid lg:col-span-1">
          <Languages githubLogin={login} />
        </div>
        <div className="grid lg:col-span-3">
          <ActivityGraph githubLogin={login} />
        </div>

        <div className="col-span-full">
          <DevCareNote>{note}</DevCareNote>
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
