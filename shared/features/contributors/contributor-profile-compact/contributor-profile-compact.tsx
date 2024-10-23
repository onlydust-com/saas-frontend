import { useMemo } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { ContributorProfileCompactProps } from "./contributor-profile-compact.types";

export function ContributorProfileCompact({ user, headerProps, footerContent }: ContributorProfileCompactProps) {
  const renderHeader = useMemo(() => {
    if (headerProps) {
      return (
        <div className="flex justify-between gap-2">
          {headerProps.headerLabel ? <Typo {...headerProps.headerLabel} size={"sm"} weight={"medium"} /> : null}
          {headerProps.badgeProps ? <Badge {...headerProps.badgeProps} size={"xxs"} /> : null}
        </div>
      );
    }
    return null;
  }, [headerProps]);

  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      {renderHeader}
      <div className={"flex flex-row items-center justify-start gap-lg"}>
        <Avatar size={"2xl"} shape={"squared"} src={user.avatarUrl} />
        <div className={"flex flex-col gap-sm"}>
          <Typo variant={"heading"} size={"xs"} weight={"medium"}>
            {user.login}
          </Typo>
          <Typo as={"div"} size={"sm"} color={"tertiary"}>
            {user.rank.getRankSummary()}
          </Typo>
        </div>
      </div>
      {footerContent}
    </Paper>
  );
}
