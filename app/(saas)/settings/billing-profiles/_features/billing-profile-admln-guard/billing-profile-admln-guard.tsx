import { useParams, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { NEXT_ROUTER } from "@/shared/constants/router";

export function withBillingProfileAdminGuard<P extends object>(Component: ComponentType<P>) {
  return function BillingProfileAdminGuard(props: P) {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = BillingProfileReactQueryAdapter.client.useGetBillingProfileById({
      pathParams: {
        billingProfileId: id,
      },
    });
    const isBillingProfileAdmin = data?.isAdmin();

    useEffect(() => {
      if (isLoading || isBillingProfileAdmin) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isBillingProfileAdmin]);

    if (isLoading || !isBillingProfileAdmin) {
      return <></>;
    }

    return <Component {...props} />;
  };
}
