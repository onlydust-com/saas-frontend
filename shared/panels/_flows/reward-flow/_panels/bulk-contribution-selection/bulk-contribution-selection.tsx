import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserFlow } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-flow/single-user-flow";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function BulkContributionSelection() {
  const { name } = useBulkContributionSelection();
  const { Panel } = useSidePanel({ name });
  const { selectedGithubUserIds } = useRewardFlow();
  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Select contribution",
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <ScrollView>
          {selectedGithubUserIds.map(githubUserId => (
            <SingleUserFlow githubUserId={githubUserId} key={githubUserId} />
          ))}
        </ScrollView>
      </SidePanelBody>
    </Panel>
  );
}
