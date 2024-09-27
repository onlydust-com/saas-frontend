import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { GlobalInformation } from "@/shared/panels/project-update-sidepanel/_components/global-information/global-information";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import {
  EditProjectFormData,
  ProjectUpdateSidePanelData,
  editProjectFormValidation,
  rewardsSettingsTypes,
} from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

export function ProjectUpdateSidepanel() {
  const { name } = useProjectUpdateSidePanel();
  const { Panel } = useSidePanel({ name });
  const { projectId, canGoBack = false } = useSinglePanelData<ProjectUpdateSidePanelData>(name) ?? { projectId: "" };

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });

  const form = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectFormValidation),
  });

  const { reset, handleSubmit } = form;

  async function onSubmit(data: EditProjectFormData) {
    // if i remove leads i have to remove it in projectLeadsToKeep
    // if i add a new lead i have to in inviteGithubUserIdsAsProjectLeads with githubUserId

    console.log("data", data, projectId);
  }

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        ecosystemIds: data.ecosystems.map(ecosystem => ecosystem.id),
        leads: [...data.leaders.map(lead => lead.id), ...data.invitedLeaders.map(lead => lead.id)],
        rewardSettingsArrays: [
          ...(!data.rewardSettings?.ignoreCodeReviews ? [rewardsSettingsTypes.CodeReviews] : []),
          ...(!data.rewardSettings?.ignoreIssues ? [rewardsSettingsTypes.Issue] : []),
          ...(!data.rewardSettings?.ignorePullRequests ? [rewardsSettingsTypes.PullRequests] : []),
        ],
      });
    }
  }, [data]);

  return (
    <Panel>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex h-full w-full flex-col gap-px"}>
          <SidePanelHeader
            title={{
              translate: {
                token: "panels:projectUpdate.title",
              },
            }}
            canGoBack={canGoBack}
            canClose={true}
          />
          <SidePanelBody>{data && <GlobalInformation project={data} />}</SidePanelBody>
        </form>
      </FormProvider>
    </Panel>
  );
}
