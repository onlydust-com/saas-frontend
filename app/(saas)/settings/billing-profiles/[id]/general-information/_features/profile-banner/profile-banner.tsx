import { useCallback } from "react";

import { VerifyBillingProfile } from "@/app/(saas)/settings/billing-profiles/[id]/_features/verify-billing-profile/verify-billing-profile";
import { SUMSUB_KYB_LEVEL, SUMSUB_KYC_LEVEL } from "@/app/api/sumsub/constants";

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

  const renderButton = useCallback(() => {
    if (!data) return null;

    const { action, type } = data.getStatus();

    if (data.status === "CLOSED" || data.status === "VERIFIED") {
      return (
        <Button
          size="sm"
          variant={type === "error" ? "destructive" : "default"}
          className="w-fit"
          onClick={() => openIntercom()}
        >
          {action}
        </Button>
      );
    } else {
      return (
        <VerifyBillingProfile
          externalId={data.id}
          levelName={data.isBillingProfileIndividual() ? SUMSUB_KYC_LEVEL : SUMSUB_KYB_LEVEL}
        >
          <Button size="sm" variant={type === "error" ? "destructive" : "default"} className="w-fit">
            {action}
          </Button>
        </VerifyBillingProfile>
      );
    }
  }, [data]);

  if (!data || !data.isAdmin()) {
    return null;
  }

  const { message, type } = data.getStatus();

  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      <div className="flex items-center justify-between gap-2">
        <AlertTitle className="m-0">{message}</AlertTitle>

        {renderButton()}
      </div>
    </Alert>
  );
}
