import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function withAdminGuard<P extends object>(Component: ComponentType<P>) {
  return function WithAdminGuard(props: P) {
    const router = useRouter();
    const { isImpersonating } = useClientBootstrapImpersonation();

    const { isLoading, isPending, user } = useAuthUser();
    const { isAdmin } = user ?? {};

    useEffect(() => {
      if (isLoading || isPending || isAdmin || isImpersonating) return;

      router.push(NEXT_ROUTER.notFound);
    }, [isLoading, isPending, isAdmin, isImpersonating, router]);

    if (isLoading || isPending || !isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}
