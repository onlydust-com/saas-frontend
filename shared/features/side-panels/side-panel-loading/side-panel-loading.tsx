import { Skeleton } from "@/design-system/atoms/skeleton";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function SidePanelLoading() {
  return (
    <div className={"flex h-full flex-col gap-px"}>
      <SidePanelHeader
        title={{
          children: <Skeleton classNames={{ base: "h-8 w-64" }} />,
        }}
      />

      <SidePanelBody>
        <Skeleton classNames={{ base: "h-32" }} />
        <Skeleton classNames={{ base: "h-32" }} />
        <Skeleton classNames={{ base: "h-32" }} />
      </SidePanelBody>

      <SidePanelFooter>
        <Skeleton classNames={{ base: "h-10 w-20" }} />
      </SidePanelFooter>
    </div>
  );
}
