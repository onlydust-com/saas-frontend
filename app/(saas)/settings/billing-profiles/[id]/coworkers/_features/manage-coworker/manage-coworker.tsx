import { useMemo } from "react";
import { toast } from "sonner";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Button } from "@/shared/ui/button";

import { ManageCoworkerProps } from "./manage-coworker.types";

export function ManageCoworker({ actionType, githubUserId, billingProfileId }: ManageCoworkerProps) {
  const { mutate: deleteCoworker, isPending: isDeletingCoworker } =
    BillingProfileReactQueryAdapter.client.useDeleteBillingProfileCoworker({
      pathParams: { billingProfileId, githubUserId },
      options: {
        onSuccess: () => {
          toast.success("Coworker removed successfully");
        },
        onError: () => {
          toast.error("Failed to remove coworker");
        },
      },
    });

  function handleDeleteCoworker() {
    deleteCoworker({});
  }

  const renderActions = useMemo(() => {
    if (actionType === "delete") {
      return (
        <Button variant="outline" onClick={handleDeleteCoworker} loading={isDeletingCoworker}>
          Remove coworker
        </Button>
      );
    }
    if (actionType === "cancel") {
      return (
        <Button variant="outline" onClick={handleDeleteCoworker} loading={isDeletingCoworker}>
          Cancel invitation
        </Button>
      );
    }
    return null;
  }, [actionType, isDeletingCoworker]);

  return <div className="flex items-center justify-end">{renderActions}</div>;
}
