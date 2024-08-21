import { useParams } from "next/navigation";

import { TransactionsContextProvider } from "@/app/programs/[programId]/_features/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/programs/[programId]/_features/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  const { programId = "" } = useParams<{ programId: string }>();
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

      <TransactionsContextProvider programId={programId}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
