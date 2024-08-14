import { useContext } from "react";

import { ProgramDetailsPanelContext } from "@/app/programs/[programId]/_context/program-details-panels/program-details-panels.context";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SIDE_PANEL_GAP, SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import { SidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group";
import { SidePanelHeader } from "@/shared/features/side-panel-group/side-panel-header/side-panel-header";
import { SidePanel } from "@/shared/features/side-panel-group/side-panel/side-panel";

import { TransactionsSidepanels } from "./transactions-sidepanel.types";
import { TransactionsContext } from "./transactions/context/transactions.context";
import { Transactions } from "./transactions/transactions";

export function TransactionsSidepanel() {
  const { transactionPanel } = useContext(ProgramDetailsPanelContext);

  const {
    filters: { clear },
  } = useContext(TransactionsContext);

  return (
    <SidePanelGroup
      ref={transactionPanel}
      panels={[TransactionsSidepanels.TRANSACTIONS, TransactionsSidepanels.EXPORT]}
      defaultPanelName={TransactionsSidepanels.TRANSACTIONS}
      config={{ closedWidth: 0, openedWidth: SIDE_PANEL_SIZE.m, gap: SIDE_PANEL_GAP.m }}
    >
      <SidePanel name={TransactionsSidepanels.TRANSACTIONS}>
        <SidePanelHeader
          canClose={true}
          title={{ token: "programs:transactionPanel.transactions.title" }}
          endContent={
            <Button
              variant="secondary-light"
              size="l"
              onClick={() => transactionPanel.current?.onNext()}
              translate={{
                token: "programs:transactionPanel.transactions.export",
              }}
            />
          }
          onClose={clear}
        />

        <Transactions />
      </SidePanel>

      <SidePanel name={TransactionsSidepanels.EXPORT}>
        <SidePanelHeader
          canGoBack={true}
          canClose={true}
          title={{ token: "programs:transactionPanel.export.title" }}
          onClose={clear}
        />
      </SidePanel>
    </SidePanelGroup>
  );
}
