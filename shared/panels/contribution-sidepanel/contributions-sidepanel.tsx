import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProfileCard } from "@/shared/features/contributors/contributor-overview/profile-card/profile-card";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Timeline } from "@/shared/panels/contribution-sidepanel/_features/timeline/timeline";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { Header } from "./_features/header/header";

export function ContributionsSidepanel() {
  const { name } = useContributionsSidepanel();
  const { Panel } = useSidePanel({ name });
  const { id } = useSinglePanelData<ContributionsPanelData>(name) ?? {
    id: "",
  };

  const { data: pixelfactProfileData } = UserReactQueryAdapter.client.useGetUserByLogin({
    pathParams: { slug: "pixelfact" },
  });

  return (
    <Panel>
      <Header />
      <SidePanelBody>
        {id}
        <Timeline />
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
