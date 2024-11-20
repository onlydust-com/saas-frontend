import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { useTransactionsContext } from "./context/transactions.context";
import { ExportCsv } from "./export-csv/export-csv";
import { Transactions } from "./transactions/transactions";

export function TransactionsSidepanel() {
  const { Panel, open } = useSidePanel({ name: "dashboard-transaction-export" });
  const {
    filters: { clear },
  } = useTransactionsContext();

  return (
    <>
      <SidePanelHeader
        canClose={true}
        title={{ translate: { token: "myDashboard:transactionPanel.transactions.title" } }}
        endContent={
          <Button
            variant="secondary"
            size="md"
            onClick={() => open()}
            translate={{
              token: "myDashboard:transactionPanel.transactions.export",
            }}
          />
        }
        onClose={clear}
      />

      <SidePanelBody>
        <div className="flex flex-col gap-3">
          <Transactions />
        </div>
      </SidePanelBody>

      <Panel>
        <SidePanelHeader
          canGoBack={true}
          canClose={true}
          title={{ translate: { token: "myDashboard:transactionPanel.export.title" } }}
          onClose={clear}
        />

        <ExportCsv />
      </Panel>
    </>
  );
}
