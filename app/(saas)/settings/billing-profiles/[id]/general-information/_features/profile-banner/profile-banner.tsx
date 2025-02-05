import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { useIntercom } from "@/shared/intercom/intercom.context";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";

export function ProfileBanner({ id }: { id: string }) {
  const { openIntercom } = useIntercom();

  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  function handleAction() {
    if (!data) return;

    if (data.status === "CLOSED" || data.status === "VERIFIED") {
      openIntercom();
    } else {
      // TODO: @billing
      // open sumsub
    }
  }

  if (!data || !data.isAdmin()) {
    return null;
  }

  const { message, action, type } = data.getStatus();

  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      <div className="flex items-center justify-between gap-2">
        <AlertTitle>{message}</AlertTitle>

        {action ? (
          <Button
            size="sm"
            variant={type === "error" ? "destructive" : "default"}
            className="w-fit"
            onClick={handleAction}
          >
            {action}
          </Button>
        ) : null}
      </div>
    </Alert>
  );
}
