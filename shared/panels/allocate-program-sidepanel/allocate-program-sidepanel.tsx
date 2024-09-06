import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

// export function AllocateProgramSidepanel(props: AllocateProgramSidepanelProps) {
export function AllocateProgramSidepanel() {
  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:allocateProgram.title" },
        }}
        canClose
      />

      <SidePanelBody>Allocation</SidePanelBody>

      <SidePanelFooter>
        <Button variant={"secondary"} size={"md"}>
          <Translate token={"panels:allocateProgram.makeAllocation"} />
        </Button>
      </SidePanelFooter>
    </>
  );
}
