import { AnimatedColumnGroup } from "@/shared/components/animated-column-group/animated-column-group";
import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { PrimaryNavigation } from "@/shared/features/navigation/primary-navigation/primary-navigation";

import { AppWrapperProps } from "./app-wrapper.types";

export function AppWrapper({ children }: AppWrapperProps) {
  const isMobile = true;

  if (isMobile) {
    return <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-3"}>{children}</div>;
  }

  return (
    <div className={"mx-auto h-dvh w-dvw max-w-[2560px] overflow-hidden p-3"}>
      <AnimatedColumnGroup className="gap-3">
        <PrimaryNavigation />
        <AnimatedColumn autoWidth={true} className="size-full">
          {children}
        </AnimatedColumn>
      </AnimatedColumnGroup>
    </div>
  );
}
