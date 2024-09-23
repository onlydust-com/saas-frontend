import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Financial } from "@/shared/panels/program-sidepanel/_components/financial/financial";
import { Information } from "@/shared/panels/program-sidepanel/_components/information/information";
import { Kpi } from "@/shared/panels/program-sidepanel/_components/kpi/kpi";
import { useProgramSidePanel } from "@/shared/panels/program-sidepanel/program-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ProgramSidePanelData } from "./program-sidepanel.types";

export function ProgramSidepanel() {
  const { name, isOpen } = useProgramSidePanel();
  const { Panel } = useSidePanel({ name });
  const {
    programId,
    canGoBack = false,
    onEditClick,
  } = useSinglePanelData<ProgramSidePanelData>(name) ?? { programId: "" };
  const { data, isLoading, isError } = ProgramReactQueryAdapter.client.useGetProgramById({
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

    if (!data || isError) {
      return <EmptyStateLite title={"panels:program.emptyState.title"} message={"panels:program.emptyState.message"} />;
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
      {onEditClick || !!data ? (
        <SidePanelFooter>
          <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
            {onEditClick && data ? (
              <Button size={"md"} variant={"secondary"} onClick={() => onEditClick(data?.id)}>
                <Translate token={"panels:program.buttons.edit"} />
              </Button>
            ) : (
              <div />
            )}

            {data ? (
              <Button
                variant={"secondary"}
                size={"md"}
                as={BaseLink}
                htmlProps={{
                  href: NEXT_ROUTER.programs.details.root(data.id),
                }}
              >
                <Translate token={"panels:program.buttons.see"} />
              </Button>
            ) : null}
          </div>
        </SidePanelFooter>
      ) : null}
    </Panel>
  );
}
