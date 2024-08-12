"use client";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";
import { SidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group";
import { SidePanel } from "@/shared/features/side-panel-group/side-panel/side-panel";

export default function TestPage() {
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
          <div className={"h-[5000px]"}>CONTENT</div>
        </AnimatedColumn>
        <SidePanelGroup defaultPanelName={"panel1"} defaultOpen={true} config={{ closedWidth: 10, openedWidth: 200 }}>
          <SidePanel name={"panel1"}>panel 1</SidePanel>
          <SidePanel name={"panel2"}>panel 2</SidePanel>
        </SidePanelGroup>
      </AnimatedColumnGroup>
    </div>
  );
}
