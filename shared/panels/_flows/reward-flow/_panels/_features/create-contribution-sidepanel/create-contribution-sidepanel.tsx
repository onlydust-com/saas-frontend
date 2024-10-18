import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Textarea } from "@/design-system/atoms/textarea";
import { Typo } from "@/design-system/atoms/typo";
import { Alert } from "@/design-system/molecules/alert";
import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useRewardFlow } from "../../../reward-flow.context";
import { useCreateContributionSidepanel } from "./create-contribution-sidepanel.hooks";
import {
  CreateContributionFormData,
  CreateContributionSidePanelData,
  createContributionFormValidation,
} from "./create-contribution-sidepanel.types";

export function CreateContributionSidepanel() {
  const { t } = useTranslation("panels");

  const { name } = useCreateContributionSidepanel();
  const { Panel, back } = useSidePanel({ name });
  const { githubUserId } = useSinglePanelData<CreateContributionSidePanelData>(name) ?? {
    githubUserId: 0,
  };

  const { projectId, addOtherWorks } = useRewardFlow();

  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: {
      projectId: projectId || "",
    },
    options: {
      enabled: !!projectId,
    },
  });

  const projectRepos = useMemo(
    () => project?.organizations?.flatMap(organization => organization.repos) || [],
    [project]
  );
  const repos = useMemo(() => projectRepos.sort((a, b) => a.name.localeCompare(b.name)), [projectRepos]);

  const selectItems: MenuItemPort<number>[] = useMemo(
    () =>
      repos.map(repo => ({
        id: repo.id,
        label: repo.name,
        searchValue: repo.name,
      })),
    [repos]
  );

  const { mutateAsync: addOtherWork, isPending: isOtherWorkPending } = RewardReactQueryAdapter.client.useAddOtherWork({
    pathParams: {
      projectId: projectId || "",
    },
  });

  const form = useForm<CreateContributionFormData>({
    resolver: zodResolver(createContributionFormValidation),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  function handleAddContribution(data: RewardableItemInterface) {
    addOtherWorks([data], githubUserId);
  }

  async function onSubmit(data: CreateContributionFormData) {
    const response = await addOtherWork(data);
    handleAddContribution(response);

    reset();
    back();
  }

  useEffect(() => {
    reset({ githubRepoId: selectItems[0]?.id });
  }, [selectItems]);

  return (
    <Panel>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex h-full w-full flex-col gap-px"}>
        <SidePanelHeader
          canGoBack
          canClose
          onClose={reset}
          onBack={reset}
          title={{ translate: { token: "panels:createContribution.header.title" } }}
        />

        <SidePanelBody>
          <ScrollView>
            <div className="flex flex-col gap-lg">
              <div className="flex flex-col gap-lg">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{
                    token: "panels:createContribution.content.title.label",
                  }}
                />

                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input size="sm" placeholder={t("createContribution.content.title.placeholder")} {...field} />
                  )}
                />
              </div>

              <div className="flex flex-col gap-lg">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{
                    token: "panels:createContribution.content.description.label",
                  }}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea placeholder={t("createContribution.content.description.placeholder")} {...field} />
                  )}
                />
              </div>

              <Alert
                color="brand"
                title={<Translate token="panels:createContribution.content.information.title" />}
                description={<Translate token="panels:createContribution.content.information.description" />}
              />

              <div className="flex flex-col gap-lg">
                <Typo
                  size="xs"
                  color="secondary"
                  translate={{
                    token: "panels:createContribution.content.repository.label",
                  }}
                />

                <Controller
                  name="githubRepoId"
                  control={control}
                  render={({ field }) => (
                    <Select<number>
                      items={selectItems}
                      name={field.name}
                      onSelect={v => field.onChange(v[0])}
                      selectedIds={[field.value]}
                      isAutoComplete
                    />
                  )}
                />
              </div>
            </div>
          </ScrollView>
        </SidePanelBody>

        <SidePanelFooter>
          <Button
            variant="secondary"
            size="md"
            translate={{
              token: "panels:createContribution.footer.button",
            }}
            type="submit"
            isDisabled={!isValid || isOtherWorkPending}
          />
        </SidePanelFooter>
      </form>
    </Panel>
  );
}
