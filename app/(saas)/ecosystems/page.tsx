"use client";

import { Orbit } from "lucide-react";

import { EcosystemsList } from "@/app/(saas)/ecosystems/_features/ecosystems-list/ecosystems-list";

import { Icon } from "@/design-system/atoms/icon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { withAuthenticated } from "@/shared/providers/auth-provider";

function EcosystemsPage() {
  return (
    <PageWrapper containerSize="small" shouldScroll>
      <div className="pb-7xl">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Ecosystems",
              iconProps: {
                component: Orbit,
              },
            },
          ]}
        />

        <div className="mx-auto flex flex-col gap-4xl py-4xl">
          <ListBanner
            title={{ children: "Explore Ecosystems" }}
            subtitle={{
              children:
                "Explore a wide range of projects shaping the future of digital communities and driving transformative change.",
            }}
            logo={<Icon component={Orbit} classNames={{ base: "size-16" }} />}
          />
        </div>

        <EcosystemsList />
      </div>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticated(EcosystemsPage));
