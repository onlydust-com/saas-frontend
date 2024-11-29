import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";

import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.hooks";
import { ProgramSelectionProps } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.types";
import { useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";

function Programs({ projectId }: ProgramSelectionProps) {
  const { selectProgramId } = useUngrantFlow();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectPrograms({
      pathParams: { projectId },
      options: {
        enabled: Boolean(projectId),
      },
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
    return <EmptyState titleTranslate={{ token: "panels:programSelection.empty.title" }} />;
  }

  const flatPrograms = data.pages.flatMap(page => page.programs);

  function handleProgramClick(programId: string) {
    selectProgramId(programId);
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
            as={"button"}
            onClick={() => handleProgramClick(program.id)}
            title={program.name}
            description={program.leads?.[0]?.login}
            logoUrl={program.logoUrl}
            projectCount={Intl.NumberFormat().format(program.projectCount)}
            userCount={Intl.NumberFormat().format(program.userCount)}
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

export function ProgramSelection({ projectId }: ProgramSelectionProps) {
  const { name } = useProgramSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:programSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <Programs projectId={projectId} />
      </SidePanelBody>
    </Panel>
  );
}
