import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useSponsorSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/sponsor-selection/sponsor-selection.hooks";
import { useUnallocateFlow } from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.context";

function Sponsors() {
  const { selectSponsor } = useUnallocateFlow();

  // TODO @hayden verify this
  const { user, isLoading, isError } = useAuthUser();
  const sponsors = user?.sponsors ?? [];

  if (isLoading) {
    return (
      <div className={"grid gap-lg"}>
        <CardProjectLoading />
        <CardProjectLoading />
        <CardProjectLoading />
      </div>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!sponsors) {
    return <EmptyState titleTranslate={{ token: "panels:unallocateSponsorSelection.empty.title" }} />;
  }

  function handleSponsorClick(sponsor: SponsorInterface) {
    selectSponsor(sponsor);
  }

  return (
    <div className={"grid gap-lg"}>
      {/*{sponsors.map(sponsor => {*/}
      {/*  const { amount: totalUsdAvailable } = moneyKernelPort.format({*/}
      {/*    amount: sponsor.totalAvailable.totalUsdEquivalent,*/}
      {/*    currency: moneyKernelPort.getCurrency("USD"),*/}
      {/*  });*/}

      {/*  return (*/}
      {/*    <CardProject*/}
      {/*      key={sponsor.id}*/}
      {/*      as={"button"}*/}
      {/*      onClick={() => handleSponsorClick(sponsor.id)}*/}
      {/*      title={sponsor.name}*/}
      {/*      description={sponsor.leads?.[0]?.login}*/}
      {/*      logoUrl={sponsor.logoUrl}*/}
      {/*      projectCount={Intl.NumberFormat().format(sponsor.projectCount)}*/}
      {/*      userCount={Intl.NumberFormat().format(sponsor.userCount)}*/}
      {/*      buttonProps={{*/}
      {/*        children: `${totalUsdAvailable} USD`,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  );*/}
      {/*})}*/}
      {sponsors.map(sponsor => {
        return (
          <CardProject
            key={sponsor.id}
            as={"button"}
            onClick={() => handleSponsorClick(sponsor)}
            title={sponsor.name}
            logoUrl={sponsor.logoUrl}
          />
        );
      })}
    </div>
  );
}

export function SponsorSelection() {
  const { name } = useSponsorSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:unallocateSponsorSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <Sponsors />
      </SidePanelBody>
    </Panel>
  );
}
