import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

import { ContributorSidepanelData } from "./contributor-sidepanel.types";

export function ContributorSidepanel() {
  const { name } = useContributorSidePanel();
  const { Panel } = useSidePanel({ name });
  const { login, githubId, canGoBack } = useSinglePanelData<ContributorSidepanelData>(name) ?? {
    login: undefined,
    githubId: undefined,
  };

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Contributor",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>
        <p>Panel :</p>
        <p>{`login : ${login}`}</p>
        <p>{`id : ${githubId}`}</p>
      </SidePanelBody>
    </Panel>
  );
}
