import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { ProgramListSidepanelProps } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

function Programs({
  sponsorId,
  onProgramClick,
}: {
  sponsorId: ProgramListSidepanelProps["sponsorId"];
  onProgramClick: ProgramListSidepanelProps["onProgramClick"];
}) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    SponsorReactQueryAdapter.client.useGetSponsorPrograms({
      pathParams: { sponsorId },
    });

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

  if (!data) {
    return (
      <EmptyState
        titleTranslate={{ token: "panels:programList.empty.title" }}
        descriptionTranslate={{ token: "panels:programList.empty.description" }}
      />
    );
  }

  const flatPrograms = data.pages.flatMap(page => page.programs);

  function handleProgramClick(programId: string) {
    if (onProgramClick) {
      onProgramClick(programId);
    }
  }

  return (
    <div className={"grid gap-lg"}>
      {flatPrograms.map(program => {
        const { amount: totalUsdAvailable } = moneyKernelPort.format({
          amount: program.totalAvailable.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <CardProject
            key={program.id}
            as={onProgramClick ? "button" : "div"}
            onClick={onProgramClick ? () => handleProgramClick(program.id) : undefined}
            title={program.name}
            description={program.leads?.[0]?.login}
            logoUrl={program.logoUrl}
            projectCount={Intl.NumberFormat().format(program.projectCount)}
            // TODO @hayden handle user count
            buttonProps={{
              children: `${totalUsdAvailable} USD`,
            }}
          />
        );
      })}
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}

export function ProgramListSidepanel({ sponsorId, onProgramClick, onCreateProgramClick }: ProgramListSidepanelProps) {
  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:programList.title" },
        }}
        canClose
      />

      <SidePanelBody>
        <Programs sponsorId={sponsorId} onProgramClick={onProgramClick} />
      </SidePanelBody>

      <SidePanelFooter>
        <Button variant={"secondary"} size={"md"} onClick={onCreateProgramClick}>
          <Translate token={"panels:programList.createProgram"} />
        </Button>
      </SidePanelFooter>
    </>
  );
}
