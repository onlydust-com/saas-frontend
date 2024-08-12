"use client";

import { useRef } from "react";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";
import { SidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group";
import { SidePanelGroupRef } from "@/shared/features/side-panel-group/side-panel-group.types";
import { SidePanel } from "@/shared/features/side-panel-group/side-panel/side-panel";

export default function TestPage() {
  const sidePanelRef = useRef<SidePanelGroupRef>(null);
  return (
    <div className={"flex h-full w-full flex-col gap-3 overflow-hidden"}>
      <SecondaryNavigation
        iconName={"ri-rocket-line"}
        breadcrumbs={[
          { id: "root", label: "OnlyDust app", href: "https://app.onlydust.com" },
          { id: "current_page", label: "Current page" },
        ]}
      />
      <AnimatedColumnGroup>
        <AnimatedColumn autoWidth={true} className="h-full flex-1 overflow-auto bg-container-2">
          <div className={"h-[5000px]"}>
            <div>
              <button onClick={() => sidePanelRef.current?.onBack()}>Back</button>
              <button onClick={() => sidePanelRef.current?.onNext()}>Next</button>
            </div>

            <div>
              <button onClick={() => sidePanelRef.current?.openPanel()}>OPEN PANEL 1</button>
              <button onClick={() => sidePanelRef.current?.closePanel()}>Close Panels</button>
            </div>

            <div>
              <button onClick={() => sidePanelRef.current?.openPanel("panel2")}>Open PANEL 2</button>
              <button onClick={() => sidePanelRef.current?.closePanel("panel2")}>Close PANEL 2</button>
            </div>
          </div>
        </AnimatedColumn>
        <SidePanelGroup
          ref={sidePanelRef}
          panels={["panel1", "panel2"]}
          defaultPanelName={"panel1"}
          config={{ closedWidth: 0, openedWidth: 370 }}
        >
          <SidePanel name={"panel1"}>
            {({ onClose, onNext }) => (
              <div className={"h-full bg-blue-500"}>
                <div>PANEL 1</div>
                <button onClick={() => onNext()}>Next</button>
                <button onClick={() => onClose()}>Close</button>
              </div>
            )}
          </SidePanel>
          <SidePanel name={"panel2"}>
            {({ onClose, onBack }) => (
              <div className={"h-full bg-red-500"}>
                <div>PANEL 2</div>
                <button onClick={() => onClose()}>Close Panel 2</button>
                <button onClick={() => onBack()}>Back</button>
              </div>
            )}
          </SidePanel>
        </SidePanelGroup>
      </AnimatedColumnGroup>
    </div>
  );
}
