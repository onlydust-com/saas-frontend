import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ProgramEcosystemFilter } from "@/shared/features/filters/program-ecosystem-filter/program-ecosystem-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useExportContributorsSidepanel } from "@/shared/panels/export-contributors-sidepanel/export-contributors-sidepanel.hooks";

export function ExportContributorsSidepanel() {
  const { name } = useExportContributorsSidepanel();
  const { Panel } = useSidePanel({ name });

  function renderContent() {
    return (
      <div>
        <ProgramEcosystemFilter />
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:exportContributors.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>{renderContent()}</SidePanelBody>

      <SidePanelFooter>
        <Button
          type={"submit"}
          variant={"secondary"}
          size={"md"}
          translate={{ token: "panels:exportContributors.export" }}
          // isDisabled={!transactionReference || previewDepositIsPending}
        />
      </SidePanelFooter>
    </Panel>
  );
}
