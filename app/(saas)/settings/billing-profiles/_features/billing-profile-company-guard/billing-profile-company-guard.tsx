import { useParams, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";

export function withBillingProfileCompanyGuard<P extends object>(Component: ComponentType<P>) {
  return (props: P) => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
      pathParams: {
        billingProfileId: id,
      },
    });
    const isBillingProfileCompany = data?.isBillingProfileCompany();

    useEffect(() => {
      if (isLoading || isBillingProfileCompany) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isBillingProfileCompany]);

    if (isLoading || !isBillingProfileCompany) {
      return <></>;
    }

    return <Component {...props} />;
  };
}
withBillingProfileCompanyGuard.displayName = "withBillingProfileCompanyGuard";
