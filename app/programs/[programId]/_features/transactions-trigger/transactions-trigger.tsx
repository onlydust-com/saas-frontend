import { useContext } from "react";

import { ProgramDetailsPanelContext } from "@/app/programs/[programId]/_context/program-details-panels/program-details-panels.context";

import { Button } from "@/design-system/atoms/button/variants/button-default";

export function TransactionsTrigger() {
  const { transactionPanel } = useContext(ProgramDetailsPanelContext);

  function togglePanel() {
    const isPanelOpen = transactionPanel.current?.isPanelOpen();
    if (isPanelOpen) {
      transactionPanel.current?.closePanel();
    } else {
      transactionPanel.current?.openPanel();
    }
  }
  return (
    <Button
      variant="secondary-light"
      translate={{ token: "programs:details.financial.buttons.seeTransactions" }}
      onClick={togglePanel}
      size="l"
    />
  );
}
