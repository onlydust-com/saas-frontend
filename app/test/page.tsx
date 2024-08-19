"use client";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SidePanelsProvider } from "@/shared/features/side-panels/side-panels.context";

function TestButton() {
  const Panel1 = useSidePanel({ name: "text-panel" });
  const Panel2 = useSidePanel({ name: "text-panel-2" });
  const Panel3 = useSidePanel({ name: "text-panel-3" }, { width: 500 });

  return (
    <>
      <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={() => Panel1.open()}>
        Click me
      </button>
      <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={() => Panel2.open()}>
        Click me 2
      </button>
      <button className="rounded-md bg-blue-500 px-4 py-2 text-white" onClick={() => Panel3.open()}>
        Click me 3
      </button>
      <Panel1.Panel>
        <div>coucou</div>
      </Panel1.Panel>
      <Panel2.Panel>
        <div>coucou2</div>
      </Panel2.Panel>
      <Panel3.Panel>
        <div>coucou3</div>
      </Panel3.Panel>
    </>
  );
}

export default function TestPage() {
  return (
    <div className={"flex h-full w-full flex-col gap-3 overflow-hidden"}>
      <SidePanelsProvider>
        <AnimatedColumn className="h-full flex-1 overflow-auto bg-container-2">
          <div className={"h-[5000px] bg-pink-900"}>
            <TestButton />
          </div>
        </AnimatedColumn>
      </SidePanelsProvider>
    </div>
  );
}
