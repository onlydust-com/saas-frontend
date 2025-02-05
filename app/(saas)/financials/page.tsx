"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { SponsorsTable } from "@/app/(saas)/financials/_features/sponsors-table/sponsors-table";

import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function withSponsorList<P extends object>(Component: ComponentType<P>) {
  return function WithSponsorList(props: P) {
    const [showSponsorList] = useShowSponsorList();
    const router = useRouter();

    useEffect(() => {
      if (showSponsorList.loading) return;

      if (!showSponsorList.hasMultipleSponsors && showSponsorList.firstSponsor) {
        router.push(NEXT_ROUTER.financials.programs.root(showSponsorList.firstSponsor));
      }
    }, [showSponsorList, router]);

    if (showSponsorList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

function FinancialPage() {
  return (
    <PageContainer size="medium">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
          },
        ]}
      />

      <PageContent classNames={{ base: "h-full" }}>
        <div className="flex h-full flex-col gap-4">
          <Typo
            size={"xs"}
            weight={"medium"}
            variant={"heading"}
            translate={{
              token: "financials:list.content.title",
            }}
          />

          <SponsorsTable />
        </div>
      </PageContent>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(withSponsorList(FinancialPage)));
