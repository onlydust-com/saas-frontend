import { ChevronRight } from "lucide-react";

import { TransactionsContextProvider } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  // const { projectSlug = "" } = useParams<{ projectSlug: string }>();
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
        translate={{ token: "manageProjects:detail.financial.buttons.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />
      <TransactionsContextProvider sponsorId={"2ea814ce-0a0e-472c-b37c-05f54396e9d6"}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}
