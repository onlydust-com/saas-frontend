import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

import { HeaderProps } from "./header.types";

export function Header(_: HeaderProps) {
  return (
    <SidePanelHeader
      canGoBack={false}
      canClose={true}
      title={{
        children: (
          <div className={"flex w-full flex-row items-center justify-start gap-lg overflow-hidden"}>
            <ContributionBadge type={"ISSUE"} number={6789} githubStatus={"OPEN"} />
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              as={"div"}
              classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
            >
              Issue detail
            </Typo>
          </div>
        ),
      }}
    />
  );
}
