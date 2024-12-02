import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";

import { CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardProgram } from "@/shared/panels/_flows/ungrant-flow/_components/card-program/card-program";
import { useProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.hooks";
import { useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";

function Programs() {
  const { projectId, selectProgram } = useUngrantFlow();

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
    return <EmptyState titleTranslate={{ token: "panels:ungrantProgramSelection.empty.title" }} />;
  }

  const flatPrograms = data.pages.flatMap(page => page.programs);

  function handleProgramClick(program: ProjectProgramListItemInterface) {
    selectProgram(program);
  }

  return (
    <div className={"grid gap-lg"}>
      {flatPrograms.map(program => (
        <CardProgram key={program.id} program={program} onClick={handleProgramClick} />
      ))}
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}

export function ProgramSelection() {
  const { name } = useProgramSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:ungrantProgramSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <Programs />
      </SidePanelBody>
    </Panel>
  );
}
