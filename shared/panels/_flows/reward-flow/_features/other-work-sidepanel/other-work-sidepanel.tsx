import { useMemo } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";

import { CreateWrapper } from "./_features/create-wrapper/create-wrapper";
import { LinkWrapper } from "./_features/link-wrapper/link-wrapper";
import { useOtherWorkSidepanel } from "./other-work-sidepanel.hooks";
import { OtherWorkSidepanelData } from "./other-work-sidepanel.types";

// TODO: Probably change it to form context
export function OtherWorkSidepanel() {
  const { name } = useOtherWorkSidepanel();
  const { Panel, isOpen, back } = useSidePanel({ name });

  const { type } = useSinglePanelData<OtherWorkSidepanelData>(name) ?? {
    type: "LINK",
  };

  const renderContent = useMemo(() => {
    if (type === "CREATE") {
      return <CreateWrapper />;
    }

    return <LinkWrapper />;
  }, [type]);

  return (
    <Panel>
      <SidePanelHeader canGoBack canClose title={{ translate: { token: `panels:otherWork.header.${type}.title` } }} />

      <SidePanelBody>
        <ScrollView>{renderContent}</ScrollView>
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant="secondary"
          size="md"
          translate={{
            token: `panels:otherWork.footer.${type}.button`,
          }}
          onClick={() => console.log("Open next panel")}
        />
      </SidePanelFooter>
    </Panel>
  );
}
