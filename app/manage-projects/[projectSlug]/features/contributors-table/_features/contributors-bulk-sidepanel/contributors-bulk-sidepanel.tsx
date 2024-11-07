import { useContext, useEffect, useMemo, useState } from "react";

import { useContributorsBulkSidePanel } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.hooks";
import { LabelSelector } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_features/label-selector/label-selector";
import { LabelSelectorProps } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_features/label-selector/label-selector.types";
import { ContributorsTableContext } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table.context";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { cn } from "@/shared/helpers/cn";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributorsBulkSidepanelData } from "./contributors-bulk-sidepanel.types";

type label = { id: string; for: number[] };

export function ContributorsBulkSidepanel() {
  const { name } = useContributorsBulkSidePanel();
  const { Panel } = useSidePanel({ name });
  const { open: openRewardFlow } = useRewardFlow();
  const { projectSlug } = useSinglePanelData<ContributorsBulkSidepanelData>(name) ?? { projectSlug: "" };
  const { userSelected, onRemoveSelection } = useContext(ContributorsTableContext);
  const [selectedLabels, setSelectedLabels] = useState<label[]>([]);

  const canReward = useCanReward(projectSlug);

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const { mutateAsync: updateContributorLabels, isPending } =
    ProjectReactQueryAdapter.client.useUpdateProjectContributorLabels({
      pathParams: { projectId: data?.id ?? "" },
    });

  const formatedLabels: LabelSelectorProps["selectedLabels"] = useMemo(() => {
    return selectedLabels?.map(label => ({
      id: label.id,
      mixed: label.for.length < userSelected.length,
    }));
  }, [selectedLabels, userSelected]);

  function buildUpdatedLabelByContributors(labels: label[]) {
    return userSelected.map(user => ({
      githubUserId: user.contributor.githubUserId,
      labels: labels.filter(label => label.for.includes(user.contributor.githubUserId)).map(label => label.id),
    }));
  }

  function onSave(labels: label[]) {
    const updatedData = buildUpdatedLabelByContributors(labels);
    updateContributorLabels({
      contributorsLabels: updatedData,
    });
  }

  function handleChange(labels: label[]) {
    onSave(labels);
    setSelectedLabels(labels);
  }

  function onChange(id: string, isSelected: boolean) {
    if (isSelected) {
      handleChange([...selectedLabels, { id, for: userSelected?.map(user => user.contributor.githubUserId) ?? [] }]);
    } else {
      handleChange(selectedLabels.filter(label => label.id !== id));
    }
  }

  useEffect(() => {
    if (userSelected.length) {
      const labels = userSelected
        .map(user => user.projectContributorLabels?.map(({ id }) => id))
        .flat()
        .filter(Boolean) as string[];

      setSelectedLabels(
        labels.map(label => ({
          id: label,
          for: userSelected
            .filter(user => user.projectContributorLabels?.map(({ id }) => id).includes(label))
            .map(user => user.contributor.githubUserId),
        }))
      );
    }
  }, [userSelected]);

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "manageProjects:bulk.title" },
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <Paper border={"primary"}>
          <div className={"flex w-full flex-col gap-lg"}>
            <Typo
              size={"sm"}
              color={"primary"}
              translate={{ token: "manageProjects:bulk.selectedTitle", count: userSelected.length }}
            />
            <div className={"flex flex-row flex-wrap items-center gap-lg"}>
              {userSelected?.map(user => (
                <Badge
                  key={user.contributor.githubUserId}
                  size={"md"}
                  color={"brand"}
                  shape={"squared"}
                  isDeletable={true}
                  avatar={{ src: user.contributor.avatarUrl }}
                  closeProps={{
                    onClose: () => onRemoveSelection(user.contributor.githubUserId),
                  }}
                >
                  {user.contributor.login}
                </Badge>
              ))}
            </div>
          </div>
        </Paper>
        <Accordion
          defaultSelected={["repositories"]}
          id={"repositories"}
          titleProps={{ translate: { token: "manageProjects:bulk.reward.title" } }}
          badgeProps={{
            children: userSelected.length || 0,
          }}
        >
          <Tooltip enabled={!canReward} content={<Translate token="common:tooltip.disabledReward" />}>
            <Button
              size={"md"}
              as={"div"}
              variant={"secondary"}
              translate={{ token: "manageProjects:bulk.reward.button" }}
              classNames={{ base: "w-full" }}
              onClick={() => openRewardFlow({ githubUserIds: userSelected.map(user => user.contributor.githubUserId) })}
              isDisabled={!canReward}
            />
          </Tooltip>
        </Accordion>
        <Accordion
          defaultSelected={["repositories"]}
          id={"repositories"}
          titleProps={{ translate: { token: "manageProjects:bulk.label.title" } }}
          badgeProps={{
            children: userSelected.length || 0,
          }}
        >
          <div className={cn({ "pointer-events-none": isPending })}>
            <LabelSelector onAction={onChange} selectedLabels={formatedLabels} projectSlug={projectSlug} />
          </div>
        </Accordion>
      </SidePanelBody>
    </Panel>
  );
}
