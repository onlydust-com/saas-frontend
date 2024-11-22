import { useMemo, useState } from "react";

import { GrantButton } from "@/app/programs/[programId]/_features/grant-button/grant-button";
import { Financial } from "@/app/programs/[programId]/_views/financial/financial";
import { Projects } from "@/app/programs/[programId]/_views/projects/projects";
import { ViewsProps } from "@/app/programs/[programId]/_views/views.types";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

enum ProgramViews {
  "PROJECTS" = "PROJECTS",
  "FINANCIAL" = "FINANCIAL",
}

export function Views({ programId }: ViewsProps) {
  const { close } = useSidePanelsContext();

  const [view, setView] = useState<ProgramViews>(ProgramViews.PROJECTS);
  const isViewProjects = view === ProgramViews.PROJECTS;
  const isViewFinancial = view === ProgramViews.FINANCIAL;

  const renderView = useMemo(() => {
    if (isViewProjects) {
      return <Projects programId={programId} />;
    }

    if (isViewFinancial) {
      return <Financial />;
    }

    return null;
  }, [isViewProjects, isViewFinancial]);

  function handleToggleView(view: string) {
    close();
    setView(view as ProgramViews);
  }

  return (
    <div className="flex h-full flex-col gap-lg">
      <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
        <Tabs
          onTabClick={handleToggleView}
          variant={"solid"}
          tabs={[
            {
              id: ProgramViews.PROJECTS,
              children: <Translate token={"programs:details.views.projects"} />,
            },
            {
              id: ProgramViews.FINANCIAL,
              children: <Translate token={"programs:details.views.financial"} />,
            },
          ]}
          selectedId={view}
        />

        <div className="flex items-center gap-lg">
          <GrantButton programId={programId} />
        </div>
      </header>

      {renderView}
    </div>
  );
}
