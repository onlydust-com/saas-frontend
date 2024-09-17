import { useMemo } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
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
  }, [dataBySlug, dataById]);

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: data?.login ?? "",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />
      <SidePanelBody>
        {!isLoading && (
          <>
            <p>Panel :</p>
            <p>{`login : ${login}`}</p>
            <p>{`id : ${githubId}`}</p>
          </>
        )}
      </SidePanelBody>
    </Panel>
  );
}
