import { TransactionsContextProvider } from "@/app/my-dashboard/_views/financial/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/my-dashboard/_views/financial/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  const { Panel, open, close, isOpen } = useSidePanel({ name: "dashboard-transaction" });

  function togglePanel() {
    if (!isOpen) {
      open();
    } else {
      close();
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        translate={{ token: "myDashboard:detail.actions.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />

      <TransactionsContextProvider>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
