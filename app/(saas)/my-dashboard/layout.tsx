"use client";

import { PropsWithChildren } from "react";

import { RequestPayment } from "@/app/(saas)/my-dashboard/_features/request-payment/request-payment";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { RequestPaymentFlowProvider } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { useMyRewardsTransactionsSidepanel } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

function Safe({ children }: PropsWithChildren) {
  useMyRewardsTransactionsSidepanel();

  return (
    <PageContent>
      <div className="flex h-full flex-col gap-lg">
        <div className="self-end">
          <RequestPayment />
        </div>
        {children}
      </div>
    </PageContent>
  );
}

function MyDashboardLayout({ children }: PropsWithChildren) {
  return (
    <PageContainer size="large" className="flex-1">
      <GithubPermissionsProvider>
        <RequestPaymentFlowProvider>
          <PosthogCaptureOnMount eventName={"my_dashboard_viewed"} />

          <Safe>{children}</Safe>

          <ContributorSidepanel />
          <ContributionsSidepanel />
        </RequestPaymentFlowProvider>
      </GithubPermissionsProvider>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(MyDashboardLayout));
