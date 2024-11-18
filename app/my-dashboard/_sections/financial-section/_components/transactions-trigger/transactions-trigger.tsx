import { ChevronRight } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

export function TransactionsTrigger() {
  function togglePanel() {
    console.log("togglePanel");
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

      {/* TODO: Add panel */}
    </>
  );
}
