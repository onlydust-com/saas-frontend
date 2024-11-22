import { useParams } from "next/navigation";

import { TransactionsContextProvider } from "@/app/manage-projects/[projectSlug]/_features/financial/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/manage-projects/[projectSlug]/_features/financial/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "manage-project-transaction" });

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
        variant={"secondary"}
        size={"sm"}
        translate={{ token: "manageProjects:detail.activity.actions.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />

      <TransactionsContextProvider projectSlug={projectSlug}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
