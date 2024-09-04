"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { SponsorsTable } from "@/app/financials/_features/sponsors-table/sponsors-table";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";
import { Translate } from "@/shared/translation/components/translate/translate";

export function withSponsorList<P extends object>(Component: ComponentType<P>) {
  return function WithSponsorList(props: P) {
    const [showSponsorList] = useShowSponsorList();
    const router = useRouter();

    useEffect(() => {
      if (showSponsorList.loading) return;

      if (!showSponsorList.hasMultipleSponsors) {
        router.push(NEXT_ROUTER.financials.details.root(showSponsorList.firstSponsor ?? ""));
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
    <PageWrapper
      navigation={{
        title: <Translate token={"financials:list.header.title"} />,
      }}
    >
      <ScrollView>
        <PageContent>
          <div className="grid h-full gap-3">
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
      </ScrollView>
    </PageWrapper>
  );
}

export default withSponsorList(FinancialPage);
