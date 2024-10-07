import { Typo } from "@/design-system/atoms/typo";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { ContributionSidepanelTitleProps } from "./contribution-sidepanel-title.types";

export function ContributionSidepanelTitle({ children, badge }: ContributionSidepanelTitleProps) {
  return (
    <div className={"flex w-full flex-row items-center justify-start gap-lg overflow-hidden"}>
      {!!badge && <ContributionBadge {...badge} />}
      <Typo
        size={"xs"}
        weight={"medium"}
        variant={"heading"}
        as={"div"}
        classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
      >
        {children}
      </Typo>
    </div>
  );
}
