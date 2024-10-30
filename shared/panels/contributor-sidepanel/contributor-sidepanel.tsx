import { SquareArrowOutUpRight } from "lucide-react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { ContributorProfileExtended } from "@/shared/features/contributors/contributor-profile-extended/contributor-profile-extended";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { Activity } from "@/shared/panels/contributor-sidepanel/_components/activity/activity";
import { Ecosystems } from "@/shared/panels/contributor-sidepanel/_components/ecosystems/ecosystems";
import { Kpi } from "@/shared/panels/contributor-sidepanel/_components/kpi/kpi";
import { Languages } from "@/shared/panels/contributor-sidepanel/_components/languages/languages";
import { RewardsGraph } from "@/shared/panels/contributor-sidepanel/_components/rewards-graph/rewards-graph";
import { Timeline } from "@/shared/panels/contributor-sidepanel/_components/timeline/timeline";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributorSidepanelData, ContributorSidepanelProps } from "./contributor-sidepanel.types";

export function ContributorSidepanel({ customFooter }: ContributorSidepanelProps) {
  const { name, isOpen } = useContributorSidePanel();
  const { Panel } = useSidePanel({ name });
  const {
    githubId = 0,
    canGoBack,
    applicationId = "",
  } = useSinglePanelData<ContributorSidepanelData>(name) ?? {
    githubId: undefined,
    applicationId: undefined,
  };

  const { data: data, isLoading } = BiReactQueryAdapter.client.useGetBiContributorById({
    pathParams: { contributorId: githubId },

    options: {
      enabled: Boolean(githubId && isOpen),
    },
  });

  function renderContent() {
    if (isLoading) {
      return (
        <div className={"flex w-full flex-col gap-lg"}>
          <Skeleton className={"h-[170px] w-full"} />
          <Skeleton className={"h-[170px] w-full"} />
        </div>
      );
    }

    if (!data) {
      // TODO WORDING
      return <EmptyStateLite />;
    }

    return (
      <div className={"flex w-full flex-col gap-lg"}>
        <ContributorProfileExtended user={data} />
        {data?.contributor.githubUserId ? (
          <>
            <Languages githubId={data?.contributor.githubUserId} />
            <Ecosystems githubId={data?.contributor.githubUserId} />
            <Kpi user={data} />
            <RewardsGraph githubId={data?.contributor.githubUserId} />
            {/* !KEEP this
             * <PublicRepo />
             */}
            <Activity user={data} />
            <Timeline user={data} />
          </>
        ) : null}
      </div>
    );
  }

  function renderFooter() {
    if (!data) return null;

    if (customFooter) {
      return customFooter({ data, applicationId });
    }

    return (
      <div className={"flex w-full flex-row items-center justify-end gap-1"}>
        <Button
          variant={"secondary"}
          endContent={<SquareArrowOutUpRight size={16} />}
          size={"md"}
          as={"a"}
          htmlProps={{
            href: marketplaceRouting(MARKETPLACE_ROUTER.publicProfile.root(data.contributor.login)),
            target: "_blank",
          }}
        >
          <Translate token={"panels:contributor.seeContributor"} />
        </Button>
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: data?.contributor.login ?? "",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>{renderContent()}</SidePanelBody>
      {data ? <SidePanelFooter>{renderFooter()}</SidePanelFooter> : null}
    </Panel>
  );
}
