import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { EditProjectBody } from "@/core/domain/project/project-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { ContributorLabels } from "@/shared/panels/project-update-sidepanel/_components/contributor-labels/contributor-labels";
import { GlobalInformation } from "@/shared/panels/project-update-sidepanel/_components/global-information/global-information";
import { MoreInfo } from "@/shared/panels/project-update-sidepanel/_components/more-info/more-info";
import { ProjectLead } from "@/shared/panels/project-update-sidepanel/_components/project-lead/project-lead";
import { Repositories } from "@/shared/panels/project-update-sidepanel/_components/repositories/repositories";
import { AddRepoToProjectSidePanel } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/add-repo-to-project-side-panel";
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
  const { Panel, close: closePanel } = useSidePanel({ name });
  const { projectId, canGoBack = false } = useSinglePanelData<ProjectUpdateSidePanelData>(name) ?? { projectId: "" };
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });

  const { mutateAsync: uploadLogo, isPending: isUploadingLogo } =
    ProjectReactQueryAdapter.client.useUploadProjectLogo();

  const { mutateAsync: editProject, isPending: isEditingProject } = ProjectReactQueryAdapter.client.useEditProject({
    pathParams: { projectId },
  });

  const form = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectFormValidation),
  });

  const { reset, handleSubmit } = form;

  async function onSubmit({
    logoFile,
    rewardSettingsArrays,
    rewardSettingsDate,
    labels,
    ...updatedData
  }: EditProjectFormData) {
    try {
      const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;

      const editProjectData: EditProjectBody = {
        ...updatedData,
        logoUrl: fileUrl?.url || data?.logoUrl, // Cause it's not send in updatedData
        contributorLabels: labels.map(label => ({ name: label.name, id: label.backendId })),
        rewardSettings: {
          ignorePullRequests: !rewardSettingsArrays.includes(rewardsSettingsTypes.PullRequests),
          ignoreIssues: !rewardSettingsArrays.includes(rewardsSettingsTypes.Issue),
          ignoreCodeReviews: !rewardSettingsArrays.includes(rewardsSettingsTypes.CodeReviews),
          ignoreContributionsBefore:
            rewardSettingsDate?.toISOString() || data?.rewardSettings?.ignoreContributionsBefore,
        },
        projectLeads: updatedData.projectLeads?.map(lead => lead.id || ""),
      };

      await editProject(editProjectData);

      closePanel();
      toast.success(<Translate token={"panels:projectUpdate.messages.success"} />);
    } catch {
      toast.error(<Translate token={"panels:projectUpdate.messages.error"} />);
    }
  }

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        labels: (data.contributorLabels || []).map(label => ({ name: label.name, backendId: label.id })),
        isLookingForContributors: data.hiring,
        githubRepoIds: (data.organizations?.flatMap(organization => organization.repos) || []).map(repo => repo.id),
        ecosystemIds: data.ecosystems.map(ecosystem => ecosystem.id),
        projectLeads: data.leaders,
        rewardSettingsDate: data.rewardSettings?.ignoreContributionsBefore
          ? new Date(data.rewardSettings?.ignoreContributionsBefore)
          : undefined,
        categoryIds: data.categories.map(category => category.id),
        rewardSettingsArrays: [
          ...(!data.rewardSettings?.ignoreCodeReviews ? [rewardsSettingsTypes.CodeReviews] : []),
          ...(!data.rewardSettings?.ignoreIssues ? [rewardsSettingsTypes.Issue] : []),
          ...(!data.rewardSettings?.ignorePullRequests ? [rewardsSettingsTypes.PullRequests] : []),
        ],
      });
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <Panel>
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
          <SidePanelBody>
            {data && (
              <>
                <GlobalInformation project={data} form={form} />
                <ProjectLead form={form} />
                <MoreInfo form={form} />
                <ContributorLabels form={form} />
                <Repositories project={data} />
              </>
            )}
          </SidePanelBody>
          <SidePanelFooter>
            <Button
              type={"submit"}
              variant={"primary"}
              size={"md"}
              translate={{ token: "panels:projectUpdate.submit" }}
              isDisabled={isLoading || isUploadingLogo || isEditingProject}
            />
          </SidePanelFooter>
        </form>
      </Panel>
      {data && <AddRepoToProjectSidePanel project={data} />}
    </FormProvider>
  );
}
