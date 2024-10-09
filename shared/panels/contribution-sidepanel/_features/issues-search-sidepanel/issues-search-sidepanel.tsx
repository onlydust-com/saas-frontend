import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useIsssuesSearchSidepanel } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel.hooks";

import { IssuesSearchSidepanelData, IssuesSearchSidepanelProps } from "./issues-search-sidepanel.types";

export function IssuesSearchSidepanel({ children }: IssuesSearchSidepanelProps) {
  const { name } = useIsssuesSearchSidepanel();
  const { Panel } = useSidePanel({ name });
  const { relatedIssueId } = useSinglePanelData<IssuesSearchSidepanelData>(name) ?? {
    relatedIssueId: "",
  };

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={true}
        canClose={true}
        title={{ translate: { token: "panels:contribution.linkedIssues.panel.title" } }}
      />
      <SidePanelBody>{relatedIssueId}</SidePanelBody>
    </Panel>
  );
}
