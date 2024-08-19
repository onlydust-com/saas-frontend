import { TransactionsSidepanel } from "@/app/programs/[programId]/_features/transactions-sidepanel/transactions-sidepanel";
import { TransactionsContextProvider } from "@/app/programs/[programId]/_features/transactions-sidepanel/transactions/context/transactions.context";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger({ programId }: { programId: string }) {
  const { Panel, open, close, isOpen } = useSidePanel({ name: "transaction" });

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
        variant="secondary-light"
        translate={{ token: "programs:details.financial.buttons.seeTransactions" }}
        onClick={togglePanel}
        size="l"
      />
      <Panel>
        <TransactionsContextProvider programId={programId}>
          <TransactionsSidepanel />
        </TransactionsContextProvider>
      </Panel>
    </>
  );
}
