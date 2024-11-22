import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

import { TransactionsContextProvider } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/financials/[sponsorId]/_views/financial/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  const { sponsorId = "" } = useParams<{ sponsorId: string }>();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "sponsor-transaction" });

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
        translate={{ token: "financials:details.financial.buttons.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />
      <TransactionsContextProvider sponsorId={sponsorId}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
