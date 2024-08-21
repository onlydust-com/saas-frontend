import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { useTransactionsContext } from "./transactions/context/transactions.context";
import { Transactions } from "./transactions/transactions";

export function TransactionsSidepanel() {
  const { Panel, open } = useSidePanel({ name: "transaction-export" });
  const {
    filters: { clear },
  } = useTransactionsContext();

  return (
    <>
      <SidePanelHeader
        canClose={true}
        title={{ token: "programs:transactionPanel.transactions.title" }}
        endContent={
          <Button
            variant="secondary-light"
            size="l"
            onClick={() => open()}
            translate={{
              token: "programs:transactionPanel.transactions.export",
            }}
          />
        }
        onClose={clear}
      />

      <ScrollView>
        <div className={"flex flex-col gap-3"}>
          <Transactions />
        </div>
      </ScrollView>
      <Panel>
        <SidePanelHeader
          canGoBack={true}
          canClose={true}
          title={{ token: "programs:transactionPanel.export.title" }}
          onClose={clear}
        />
      </Panel>
    </>
  );
}
