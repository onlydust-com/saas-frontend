import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { useOtherWorkSidepanel } from "./other-work-sidepanel.hooks";

export function OtherWorkSidepanel() {
  const { name } = useOtherWorkSidepanel();
  const { Panel, isOpen, back } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={true}
        canClose={true}
        title={{ translate: { token: "panels:contribution.linkedIssues.panel.title" } }}
      />
      <SidePanelBody>
        <ScrollView>
          <div className="flex flex-col gap-3">
            <p>Other work</p>
          </div>
        </ScrollView>
      </SidePanelBody>
    </Panel>
  );
}
