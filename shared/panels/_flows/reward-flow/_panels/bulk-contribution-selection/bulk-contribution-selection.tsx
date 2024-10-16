import { useEffect, useMemo, useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserFlow } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/_features/single-user-flow/single-user-flow";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { useBulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

export function BulkContributionSelection() {
  const { open } = useBulkContributionValidation();
  const { name, isOpen } = useBulkContributionSelection();
  const { Panel } = useSidePanel({ name });
  const { selectedGithubUserIds } = useRewardFlow();
  const [isRewardValid, setIsRewardValid] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setIsRewardValid(prev => {
      const newIsValid = { ...prev };
      selectedGithubUserIds.forEach(id => {
        newIsValid[id] = false;
      });
      return newIsValid;
    });
  }, [selectedGithubUserIds]);

  function handleValidate(githubUserId: number) {
    setIsRewardValid(prev => {
      const newIsValid = { ...prev };
      newIsValid[githubUserId] = true;
      return newIsValid;
    });
  }

  const isAllValid = useMemo(() => {
    return Object.values(isRewardValid).every(Boolean);
  }, [isRewardValid]);

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:bulkContributionSelection.title",
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
                <SingleUserFlow githubUserId={githubUserId} key={githubUserId} onValidate={handleValidate} />
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
            token: "common:next",
          }}
          isDisabled={!isAllValid}
          onClick={open}
        />
      </SidePanelFooter>
    </Panel>
  );
}
