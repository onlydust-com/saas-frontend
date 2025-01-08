import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";

import { useApplyIssueSidePanel } from "./apply-issue-sidepanel.hooks";
import { ApplyIssueSidepanelData, ApplyIssueSidepanelProps } from "./apply-issue-sidepanel.types";

function Content() {
  return <div>Content</div>;
}

export function ApplyIssueSidepanel({ children }: ApplyIssueSidepanelProps) {
  const { name, isOpen } = useApplyIssueSidePanel();
  const { Panel } = useSidePanel({ name });
  const { issueId = 0, canGoBack } = useSinglePanelData<ApplyIssueSidepanelData>(name) ?? {
    issueId: undefined,
  };

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>
        <Content />
      </SidePanelBody>
      <SidePanelFooter>footer</SidePanelFooter>
    </Panel>
  );
}
