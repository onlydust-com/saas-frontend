import { ChevronRight } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { TransactionsContextProvider } from "../transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "../transactions-sidepanel/transactions-sidepanel";

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
        variant="primary"
        endIcon={{ component: ChevronRight }}
        isTextButton
        size="md"
        translate={{ token: "myDashboard:detail.financial.buttons.seeTransactions" }}
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
