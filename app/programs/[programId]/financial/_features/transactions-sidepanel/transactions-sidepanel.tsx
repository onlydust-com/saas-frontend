import { useTransactionsContext } from "@/app/programs/[programId]/financial/_features/transactions-sidepanel/context/transactions.context";
import { ExportCsv } from "@/app/programs/[programId]/financial/_features/transactions-sidepanel/export-csv/export-csv";
import { Transactions } from "@/app/programs/[programId]/financial/_features/transactions-sidepanel/transactions/transactions";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsSidepanel() {
  const { Panel, open } = useSidePanel({ name: "program-transaction-export" });
  const {
    filters: { clear },
  } = useTransactionsContext();

  return (
    <>
      <SidePanelHeader
        canClose={true}
        title={{ translate: { token: "programs:transactionPanel.transactions.title" } }}
        endContent={
          <Button
            variant="secondary"
            size="md"
            onClick={() => open()}
            translate={{
              token: "programs:transactionPanel.transactions.export",
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
          title={{ translate: { token: "programs:transactionPanel.export.title" } }}
          onClose={clear}
        />

        <ExportCsv />
      </Panel>
    </>
  );
}
