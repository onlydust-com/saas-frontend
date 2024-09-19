import { useMemo } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Activity } from "@/shared/panels/contributor-sidepanel/_components/activity/activity";
import { Ecosystems } from "@/shared/panels/contributor-sidepanel/_components/ecosystems/ecosystems";
import { Kpi } from "@/shared/panels/contributor-sidepanel/_components/kpi/kpi";
import { Languages } from "@/shared/panels/contributor-sidepanel/_components/languages/languages";
import { Profile } from "@/shared/panels/contributor-sidepanel/_components/profile/profile";
import { RewardsGraph } from "@/shared/panels/contributor-sidepanel/_components/rewards-graph/rewards-graph";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

import { ContributorSidepanelData } from "./contributor-sidepanel.types";

export function ContributorSidepanel() {
  const { name, isOpen } = useContributorSidePanel();
  const { Panel } = useSidePanel({ name });
  const {
    login = "",
    githubId = 0,
    canGoBack,
  } = useSinglePanelData<ContributorSidepanelData>(name) ?? {
    login: undefined,
    githubId: undefined,
  };

  const { data: dataById, isLoading: isLoadingById } = UserReactQueryAdapter.client.useGetUserById({
    pathParams: { githubId },
    options: {
      enabled: !!githubId && isOpen,
    },
  });

  const { data: dataBySlug, isLoading: isLoadingBySlug } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: { slug: login },
    options: {
      enabled: !!login && login !== "" && isOpen,
    },
  });

  const isLoading = isLoadingById || isLoadingBySlug;

  const data = useMemo(() => {
    if (dataById && githubId) {
      return dataById;
    }
    if (dataBySlug && login) {
      return dataBySlug;
    }

    return undefined;
  }, [dataBySlug, dataById, githubId, login]);

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
        <Profile user={data} />
        <Kpi user={data} />
        {data?.githubUserId ? (
          <>
            <Languages githubId={data.githubUserId} />
            <Ecosystems githubId={data.githubUserId} />
            <RewardsGraph githubId={data.githubUserId} />
            <Activity githubId={data.githubUserId} />
          </>
        ) : null}
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: data?.login ?? "",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>{renderContent()}</SidePanelBody>
    </Panel>
  );
}
