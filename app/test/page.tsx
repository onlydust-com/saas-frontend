"use client";

import { TestSidePanel } from "@/app/test/_components/side-panel/test-side-panel";

import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { SecondaryNavigation } from "@/shared/features/navigation/secondary-navigation/secondary-navigation";
import { cn } from "@/shared/helpers/cn";
import { useIsMobile } from "@/shared/hooks/ui/use-media-query";

export default function TestPage() {
  // TODO UPDATE THIS TO MAKE A COMPONENT
  const isMobile = useIsMobile();
  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <SecondaryNavigation
        iconName={"ri-rocket-line"}
        breadcrumbs={[
          { id: "root", label: "OnlyDust app", href: "https://app.onlydust.com" },
          { id: "current_page", label: "Current page" },
        ]}
      />
      <AnimatedColumnGroup>
        <AnimatedColumn autoWidth={true} className="h-full flex-1 overflow-auto bg-yellow-900">
          <div
            className={cn("h-[5000px] bg-orange-900", {
              // "bg-red-500": isGreaterThanTablet,
              "bg-green-500": isMobile,
            })}
          >
            CONTENT
          </div>
        </AnimatedColumn>
        <TestSidePanel />
      </AnimatedColumnGroup>
      {/*<div className={"h-full flex-1 overflow-auto bg-yellow-900"}>*/}
      {/*  <div className={"h-[5000px] bg-orange-900"}>CONTENT</div>*/}
      {/*</div>*/}
    </div>
  );
}
