import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { IssuesSearchSidepanel } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel";
import {
  useContributionBlocks,
  useContributionsSidepanel,
} from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { Header } from "./_features/header/header";

export function ContributionsSidepanel() {
  const { name } = useContributionsSidepanel();
  const { Panel, isOpen } = useSidePanel({ name });
  const { id } = useSinglePanelData<ContributionsPanelData>(name) ?? {
    id: "",
  };

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionId: id },
    options: {
      enabled: isOpen && !!id,
    },
  });

  const blocks = useContributionBlocks(contribution);

  // TODO HANDLE GITHUB PERMISSIONS

  return (
    <>
      <Panel>
        <Header />
        <SidePanelBody>{blocks}</SidePanelBody>
      </Panel>
      <IssuesSearchSidepanel />
    </>
  );
}
