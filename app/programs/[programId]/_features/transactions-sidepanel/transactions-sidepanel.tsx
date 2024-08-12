import { useContext } from "react";

import { ProgramDetailsPanelContext } from "@/app/programs/[programId]/_context/program-details-panels/program-details-panels.context";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SIDE_PANEL_GAP, SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import { SidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group";
import { SidePanelHeader } from "@/shared/features/side-panel-group/side-panel-header/side-panel-header";
import { SidePanel } from "@/shared/features/side-panel-group/side-panel/side-panel";

import { TransactionsSidepanels } from "./transactions-sidepanel.types";

export function TransactionsSidepanel() {
  const { transactionPanel } = useContext(ProgramDetailsPanelContext);

  return (
    <SidePanelGroup
      ref={transactionPanel}
      panels={[TransactionsSidepanels.TRANSACTIONS, TransactionsSidepanels.EXPORT]}
      defaultPanelName={TransactionsSidepanels.TRANSACTIONS}
      config={{ closedWidth: 0, openedWidth: SIDE_PANEL_SIZE.m, gap: SIDE_PANEL_GAP.m }}
    >
      <SidePanel name={TransactionsSidepanels.TRANSACTIONS}>
        <SidePanelHeader asCloseButton={true} title={{ token: "programs:transactionPanel.transaction.title" }} />
        <Button variant={"secondary-light"} onClick={() => transactionPanel.current?.onNext()}>
          Export CSV
        </Button>
      </SidePanel>
      <SidePanel name={TransactionsSidepanels.EXPORT}>
        <SidePanelHeader
          asBackButton={true}
          asCloseButton={true}
          title={{ token: "programs:transactionPanel.export.title" }}
        />
      </SidePanel>
    </SidePanelGroup>
  );
}
