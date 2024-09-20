import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Financial } from "@/shared/panels/program-sidepanel/_components/financial/financial";
import { Information } from "@/shared/panels/program-sidepanel/_components/information/information";
import { Kpi } from "@/shared/panels/program-sidepanel/_components/kpi/kpi";
import { useProgramSidePanel } from "@/shared/panels/program-sidepanel/program-sidepanel.hooks";

import { ProgramSidePanelData } from "./program-sidepanel.types";

export function ProgramSidepanel() {
  const { name, isOpen } = useProgramSidePanel();
  const { Panel } = useSidePanel({ name });
  const { programId, canGoBack = false } = useSinglePanelData<ProgramSidePanelData>(name) ?? { programId: "" };
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: { programId },
    options: {
      enabled: !!programId && isOpen,
    },
  });

  function renderContent() {
    if (isLoading) {
      return (
        <div className={"flex w-full flex-col gap-lg"}>
          <Skeleton className={"h-[170px] w-full"} />
          <Skeleton className={"h-[170px] w-full"} />
          <Skeleton className={"h-[170px] w-full"} />
        </div>
      );
    }

    if (!data) {
      return <EmptyStateLite />;
    }

    return (
      <div className={"flex w-full flex-col gap-lg"}>
        <Kpi data={data} />
        <Financial data={data} />
        <Information data={data} />
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: data?.name,
        }}
        canGoBack={canGoBack}
        canClose={true}
      />

      <SidePanelBody>{renderContent()}</SidePanelBody>
    </Panel>
  );
}
