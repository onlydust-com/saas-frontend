"use client";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function Home() {
  // const router = useRouter();
  // const { user } = useAuthUser();

  // function handleRedirect() {
  //   if (user?.sponsors?.length) {
  //     return router.push(NEXT_ROUTER.financials.root);
  //   }

  //   if (user?.programs?.length) {
  //     return router.push(NEXT_ROUTER.programs.root);
  //   }

  //   if (user?.projectsLed?.length) {
  //     return router.push(NEXT_ROUTER.manageProjects.root);
  //   }

  //   return router.push(NEXT_ROUTER.myDashboard.root);
  // }

  // useEffect(() => {
  //   if (user) {
  //     handleRedirect();
  //   }
  // }, [user]);

  return (
    <PageWrapper containerSize="medium">
      <Skeleton classNames={{ base: "w-full h-full" }} />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticated(Home));
