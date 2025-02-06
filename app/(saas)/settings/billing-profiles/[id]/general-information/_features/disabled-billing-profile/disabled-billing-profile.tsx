import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { TypographyMuted } from "@/shared/ui/typography";

export function DisabledBillingProfile({ id }: { id: string }) {
  const { data } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
    pathParams: {
      billingProfileId: id,
    },
  });

  if (!data || data.enabled) return null;

  return <TypographyMuted>This billing profile has been disabled, enable it to receive rewards.</TypographyMuted>;
}
