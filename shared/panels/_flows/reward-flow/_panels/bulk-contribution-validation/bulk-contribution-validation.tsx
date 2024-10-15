import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserSummary } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/_features/single-user-summary/single-user-summary";
import { useBulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function BulkContributionValidation() {
  const { name, isOpen } = useBulkContributionValidation();
  const { selectedGithubUserIds } = useRewardFlow();
  const { Panel } = useSidePanel({ name });
  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:bulkContributionValidation.title",
          },
        }}
        canGoBack
        canClose
      />
      <SidePanelBody>
        <SidePanelBody>
          <ScrollView>
            {isOpen && (
              <div className={"flex w-full flex-col gap-lg"}>
                {selectedGithubUserIds.map(githubUserId => (
                  <SingleUserSummary githubUserId={githubUserId} key={githubUserId} />
                ))}
              </div>
            )}
          </ScrollView>
        </SidePanelBody>
      </SidePanelBody>
    </Panel>
  );
}
