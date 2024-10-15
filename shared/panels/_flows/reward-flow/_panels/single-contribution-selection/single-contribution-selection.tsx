import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { UserProfileCard } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { CreateContributionSidepanel } from "../_features/create-contribution-sidepanel/create-contribution-sidepanel";
import { useCreateContributionSidepanel } from "../_features/create-contribution-sidepanel/create-contribution-sidepanel.hooks";
import { LinkContributionSidepanel } from "../_features/link-contribution-sidepanel/link-contribution-sidepanel";
import { useLinkContributionSidepanel } from "../_features/link-contribution-sidepanel/link-contribution-sidepanel.hooks";

export function SingleContributionSelection() {
  const { name } = useSingleContributionSelection();
  const { Panel } = useSidePanel({ name });

  const { selectedGithubUserIds, getSelectedContributionIds } = useRewardFlow();

  const { open: openLinkContributionPanel } = useLinkContributionSidepanel();
  const { open: openCreateContributionPanel } = useCreateContributionSidepanel();

  const [selectedGithubUserId] = selectedGithubUserIds;
  const { open: singleContributionValidation } = useSingleContributionValidation();

  const selectedContributionIds = getSelectedContributionIds(selectedGithubUserId);
  return (
    <>
      <Panel>
        <SidePanelHeader
          title={{
            translate: {
              token: "panels:singleContributionSelection.title",
            },
          }}
          canClose
        />

        <SidePanelBody>
          <UserProfileCard githubUserId={selectedGithubUserId} />

          <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex-1" }}>
            <UserContributions githubUserId={selectedGithubUserId} />
          </Paper>
        </SidePanelBody>

        <SidePanelFooter>
          <Button
            variant={"secondary"}
            size={"md"}
            translate={{
              token: "common:next",
            }}
            isDisabled={!selectedContributionIds?.length}
            onClick={() => singleContributionValidation()}
          />
        </SidePanelFooter>
      </Panel>

      <LinkContributionSidepanel />
      <CreateContributionSidepanel />
    </>
  );
}
