import { useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelLoading } from "@/shared/features/side-panels/side-panel-loading/side-panel-loading";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Footer } from "@/shared/panels/contribution-sidepanel/_features/footer/footer";
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

  const [openHelper, setOpenHelper] = useState(false);

  function handleToggleHelper() {
    setOpenHelper(!openHelper);
  }

  const { data: contribution, isLoading } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: id },
    options: {
      enabled: isOpen && !!id,
    },
  });

  const blocks = useContributionBlocks({
    contribution,
    helperState: {
      isOpen: openHelper,
      setIsOpen: setOpenHelper,
    },
  });

  // TODO HANDLE GITHUB PERMISSIONS

  return (
    <Panel>
      {isLoading ? (
        <SidePanelLoading />
      ) : (
        <>
          <Header contribution={contribution} onToggleHelper={handleToggleHelper} />
          <SidePanelBody>{blocks}</SidePanelBody>
          {contribution ? <Footer contribution={contribution} /> : null}
        </>
      )}
    </Panel>
  );
}
