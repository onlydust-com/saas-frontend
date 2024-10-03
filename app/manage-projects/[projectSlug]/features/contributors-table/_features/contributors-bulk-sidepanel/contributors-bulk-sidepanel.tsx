import { useContext } from "react";

import { useContributorsBulkSidePanel } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.hooks";
import { ContributorsTableContext } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table.context";

import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";

import { ContributorsBulkSidepanelData, ContributorsBulkSidepanelProps } from "./contributors-bulk-sidepanel.types";

export function ContributorsBulkSidepanel({ children }: ContributorsBulkSidepanelProps) {
  const { name } = useContributorsBulkSidePanel();
  const { Panel } = useSidePanel({ name });
  const { projectSlug } = useSinglePanelData<ContributorsBulkSidepanelData>(name) ?? { projectSlug: "" };
  const { userSelected, onRemoveSelection } = useContext(ContributorsTableContext);
  console.log("USER SELECTED", userSelected);

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
      </SidePanelBody>
    </Panel>
  );
}
