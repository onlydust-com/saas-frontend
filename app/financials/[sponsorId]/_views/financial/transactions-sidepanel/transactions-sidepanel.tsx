import { useTransactionsContext } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/context/transactions.context";
import { ExportCsv } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/export-csv/export-csv";
import { Transactions } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/transactions/transactions";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsSidepanel() {
  const { Panel, open } = useSidePanel({ name: "sponsor-transaction-export" });
  const {
    filters: { clear },
  } = useTransactionsContext();

  return (
    <>
      <SidePanelHeader
        canClose={true}
        title={{ translate: { token: "financials:transactionPanel.transactions.title" } }}
        endContent={
          <Button
            variant="secondary"
            size="md"
            onClick={() => open()}
            translate={{
              token: "financials:transactionPanel.transactions.export",
            }}
          />
        }
        onClose={clear}
      />

      <SidePanelBody>
        <div className={"flex flex-col gap-3"}>
          <Transactions />
        </div>
      </SidePanelBody>

      <Panel>
        <SidePanelHeader
          canGoBack={true}
          canClose={true}
          title={{ translate: { token: "financials:transactionPanel.export.title" } }}
          onClose={clear}
        />

        <ExportCsv />
      </Panel>
    </>
  );
}
