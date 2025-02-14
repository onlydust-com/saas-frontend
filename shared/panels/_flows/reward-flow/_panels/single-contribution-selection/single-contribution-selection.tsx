import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";

import { ContributorCard } from "@/shared/features/contributors/contributor-card/contributor-card";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

function Content() {
  const { selectedGithubUserIds, getSelectedContributions, getAvatarUrl, getLogin } = useRewardFlow();
  const [selectedGithubUserId] = selectedGithubUserIds || [];
  const { open: singleContributionValidation } = useSingleContributionValidation();

  const selectedContributions = getSelectedContributions(selectedGithubUserId);
  const avatarUrl = getAvatarUrl(selectedGithubUserId);
  const login = getLogin(selectedGithubUserId);

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionSelection.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <ContributorCard avatarUrl={avatarUrl} login={login} />

        <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex-1" }}>
          <UserContributions githubUserId={selectedGithubUserId} />
        </Paper>
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          translate={{
            token: "common:next",
          }}
          isDisabled={!selectedContributions?.length}
          onClick={() => singleContributionValidation()}
        />
      </SidePanelFooter>
    </>
  );
}

export function SingleContributionSelection() {
  const { name } = useSingleContributionSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
