"use client";

import { TestSidePanel } from "@/app/test/_components/side-panel/test-side-panel";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";

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
        <TestSidePanel />
      </AnimatedColumnGroup>
    </div>
  );
}
