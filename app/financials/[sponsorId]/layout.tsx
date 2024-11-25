"use client";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { DepositButton } from "@/app/financials/[sponsorId]/financial/_features/deposit-button/deposit-button";
import { AllocateButton } from "@/app/financials/[sponsorId]/programs/_features/allocate-button/allocate-button";
import { CreateButton } from "@/app/financials/[sponsorId]/programs/_features/create-button/create-button";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "PROGRAMS" = "PROGRAMS",
  "FINANCIAL" = "FINANCIAL",
}

export default function FinancialDetailLayout({
  children,
  params: { sponsorId },
}: PropsWithChildren<{ params: { sponsorId: string } }>) {
  const isPrograms = useMatchPath(NEXT_ROUTER.financials.programs.root(sponsorId));
  const isFinancial = useMatchPath(NEXT_ROUTER.financials.financial.root(sponsorId));

  const selectedId = useMemo(() => {
    if (isPrograms) {
      return Views.PROGRAMS;
    }
    if (isFinancial) {
      return Views.FINANCIAL;
    }
  }, [isPrograms, isFinancial]);

  const renderActions = useCallback(() => {
    if (isPrograms) {
      return (
        <>
          <CreateButton sponsorId={sponsorId} />
          <AllocateButton sponsorId={sponsorId} />
        </>
      );
    }

    if (isFinancial) {
      return <DepositButton sponsorId={sponsorId} />;
    }

    return null;
  }, [isPrograms, isFinancial]);

  const { data } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
            href: NEXT_ROUTER.financials.root,
          },
          {
            id: "details",
            label: data?.name,
          },
        ],
      }}
    >
      <PosthogCaptureOnMount
        eventName={"sponsor_viewed"}
        params={{
          sponsor_id: sponsorId,
        }}
        paramsReady={Boolean(sponsorId)}
      />

      <AnimatedColumn className="h-full">
        <ScrollView className={"flex flex-col"}>
          <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
            <div className="flex h-full flex-col gap-lg">
              <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
                <Tabs
                  variant={"solid"}
                  searchParams={"data-view"}
                  tabs={[
                    {
                      id: Views.PROGRAMS,
                      children: <Translate token={"financials:details.views.programs"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.financials.programs.root(sponsorId),
                      },
                    },
                    {
                      id: Views.FINANCIAL,
                      children: <Translate token={"financials:details.views.financial"} />,
                      as: BaseLink,
                      htmlProps: {
                        href: NEXT_ROUTER.financials.financial.root(sponsorId),
                      },
                    },
                  ]}
                  selectedId={selectedId}
                />

                <div className="flex items-center gap-lg">{renderActions()}</div>
              </header>

              {children}
            </div>
          </PageContent>
        </ScrollView>
      </AnimatedColumn>
    </PageWrapper>
  );
}
