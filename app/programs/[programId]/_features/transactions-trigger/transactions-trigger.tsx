import { ChevronRight } from "lucide-react";
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
        variant={"primary"}
        endIcon={{ component: ChevronRight }}
        isTextButton
        size={"md"}
        translate={{ token: "programs:details.financial.buttons.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />
      <TransactionsContextProvider programId={programId}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
