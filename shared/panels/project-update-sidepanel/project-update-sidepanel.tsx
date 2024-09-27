import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { EditProjectBody } from "@/core/domain/project/project-contract.types";

import { toast } from "@/design-system/molecules/toaster";

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
import { Translate } from "@/shared/translation/components/translate/translate";

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

  const { mutateAsync: uploadLogo } = ProjectReactQueryAdapter.client.useUploadProjectLogo();
  const { mutateAsync: editProject } = ProjectReactQueryAdapter.client.useEditProject({
    pathParams: { projectId },
  });

  const form = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectFormValidation),
  });

  const { reset, handleSubmit } = form;

  async function onSubmit({ logoFile, leads, ...data }: EditProjectFormData) {
    try {
      // if i remove leads i have to remove it in projectLeadsToKeep
      // if i add a new lead i have to in inviteGithubUserIdsAsProjectLeads with githubUserId

      const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;
      // const newLead = leads.find(lead => !data.projectLeadsToKeep.includes(lead));

      const editProjectData: EditProjectBody = {
        ...data,
        logoUrl: fileUrl?.url || data?.logoUrl,
        // projectLeadsToKeep: data.projectLeadsToKeep?.filter(lead => leads.includes(lead)),
      };

      await editProject(editProjectData);

      close();
      toast.success(<Translate token={"panels:projectUpdate.messages.success"} />);
    } catch {
      toast.error(<Translate token={"panels:projectUpdate.messages.error"} />);
    }
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
