"use client";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function BillingProfileInvoicesPage({ params }: { params: { id: string } }) {
  const {
    data: invoicesData,
    isLoading: invoicesLoading,
    isError: invoicesError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfileReactQueryAdapter.client.useGetBillingProfileInvoices({
    pathParams: { billingProfileId: params.id },
    queryParams: {
      sort: "CREATED_AT",
      direction: "DESC",
    },
  });

  return (
    <div>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Settings",
          },
          {
            id: "billing-profiles",
            label: "Billing Profiles",
            href: NEXT_ROUTER.settings.billingProfiles.root,
          },
          {
            id: "invoices",
            label: "Invoices",
          },
        ]}
      />
      Billing Profile Invoices
    </div>
  );
}

export default withClientOnly(withAuthenticated(BillingProfileInvoicesPage));
