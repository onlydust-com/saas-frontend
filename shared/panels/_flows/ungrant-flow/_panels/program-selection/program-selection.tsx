import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";

import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { CardProgram } from "@/shared/panels/_flows/ungrant-flow/_components/card-program/card-program";
import { useProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.hooks";
import { useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";

function Programs() {
  const { t } = useTranslation();
  const { projectId, selectProgram } = useUngrantFlow();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    300,
    [search]
  );

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectPrograms({
      pathParams: { projectId },
      queryParams: {
        search: debouncedSearch,
      },
      options: {
        enabled: Boolean(projectId),
      },
    });

  const flatPrograms = useMemo(() => data?.pages.flatMap(page => page.programs) ?? [], [data]);

  function handleProgramClick(program: ProjectProgramListItemInterface) {
    selectProgram(program);
  }

  function renderPrograms() {
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

    if (!flatPrograms.length) {
      return <EmptyStateLite />;
    }
    return (
      <>
        {flatPrograms.map(program => (
          <CardProgram key={program.id} program={program} onClick={handleProgramClick} />
        ))}
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </>
    );
  }

  return (
    <div className={"grid gap-lg"}>
      <Input
        name="searchPrograms"
        value={search}
        size="sm"
        onChange={e => setSearch(e.target.value)}
        startContent={<Icon component={Search} classNames={{ base: "text-foreground-tertiary" }} />}
        placeholder={t("panels:ungrantProgramSelection.search.placeholder")}
      />

      {renderPrograms()}
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
