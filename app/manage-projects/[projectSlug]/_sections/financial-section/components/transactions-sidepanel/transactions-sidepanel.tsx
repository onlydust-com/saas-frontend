import { useTransactionsContext } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";
import { ExportCsv } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/export-csv/export-csv";
import { Transactions } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/transactions/transactions";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsSidepanel() {
  const { Panel, open } = useSidePanel({ name: "financial-transaction-export" });
  const {
    filters: { clear },
  } = useTransactionsContext();

  return (
    <>
      <SidePanelHeader
        canClose={true}
        title={{ translate: { token: "manageProjects:transactionPanel.transactions.title" } }}
        endContent={
          <Button
            variant="secondary"
            size="md"
            onClick={() => open()}
            translate={{
              token: "manageProjects:transactionPanel.transactions.export",
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
          title={{ translate: { token: "manageProjects:transactionPanel.export.title" } }}
          onClose={clear}
        />

        <ExportCsv />
      </Panel>
    </>
  );
}
