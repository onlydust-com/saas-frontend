import { TestSidePanel } from "@/app/test/_components/side-panel/test-side-panel";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";

export default function TestPage() {
  // TODO UPDATE THIS TO MAKE A COMPONENT
  return (
    <div className={"flex h-full w-full flex-col overflow-hidden bg-orange-900"}>
      <div className="min-h-[50px] w-full bg-blue-500">TOP NAV</div>
      <AnimatedColumnGroup>
        <AnimatedColumn autoWidth={true} className="h-full flex-1 overflow-auto bg-yellow-900">
          <div className={"h-[5000px] bg-orange-900"}>CONTENT</div>
        </AnimatedColumn>
        <TestSidePanel />
      </AnimatedColumnGroup>
    </div>
  );
}
