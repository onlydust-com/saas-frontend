import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { toast } from "@/design-system/molecules/toaster";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserSummary } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/_features/single-user-summary/single-user-summary";
import { useBulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function BulkContributionValidation() {
  const { name, isOpen } = useBulkContributionValidation();
  const { selectedGithubUserIds, getRewardBody, projectId = "" } = useRewardFlow();
  const { Panel } = useSidePanel({ name });

  const { mutate, isPending } = RewardReactQueryAdapter.client.useCreateRewards({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"panels:singleContributionValidation.toast.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"panels:singleContributionValidation.toast.error"} />);
      },
    },
  });

  function handleCreateRewards() {
    mutate(getRewardBody());
  }

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
      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:reward",
          }}
          isDisabled={isPending}
          onClick={() => handleCreateRewards()}
        />
      </SidePanelFooter>
    </Panel>
  );
}
