import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { ContributionSidepanelTitle } from "@/shared/features/contributions/contribution-sidepanel-title/contribution-sidepanel-title";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useIssueSandboxPanel } from "@/shared/panels/issue-sandbox-panel/issue-sandbox-panel.hooks";

import { IssueSandboxPanelData } from "./issue-sandbox-panel.types";

export function IssueSandboxPanel() {
  const { name } = useIssueSandboxPanel();
  const { Panel } = useSidePanel({ name });
  const { id } = useSinglePanelData<IssueSandboxPanelData>(name) ?? {
    id: "",
  };

  const { data: pixelfactProfileData } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: { slug: "pixelfact" },
  });

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{
          children: (
            <ContributionSidepanelTitle badge={{ type: "ISSUE", number: 6789, githubStatus: "OPEN" }}>
              Issue detail
            </ContributionSidepanelTitle>
          ),
        }}
      />
      <SidePanelBody>
        {id}
        <div>
          {pixelfactProfileData ? (
            <ProfileCard
              headerProps={{
                headerLabel: { children: "Assigned" },
                badgeProps: { children: "2 days ago", color: "success" },
              }}
              user={pixelfactProfileData}
              footerContent={
                <Button variant={"secondary"} classNames={{ base: "w-full" }}>
                  Remove contributor
                </Button>
              }
            />
          ) : null}
        </div>
      </SidePanelBody>
    </Panel>
  );
}
