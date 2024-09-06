import { CreateProgramPanelProps } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.types";

import { Accordion } from "@/design-system/molecules/accordion";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function CreateProgramPanel({ sponsorId }: CreateProgramPanelProps) {
  console.log("sponsorId", sponsorId);
  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "financials:createProgramPanel.title" },
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <Accordion
          id={"general-information"}
          titleProps={{ translate: { token: "financials:createProgramPanel.informations.title" } }}
        >
          BODY
        </Accordion>
      </SidePanelBody>
    </>
  );
}
