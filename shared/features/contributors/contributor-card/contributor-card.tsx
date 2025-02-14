import { PropsWithChildren } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

export function ContributorCard({
  children,
  avatarUrl,
  login,
}: PropsWithChildren<{ avatarUrl?: string; login: string }>) {
  return (
    <Paper border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <div className={"flex flex-row items-center justify-start gap-lg"}>
        <Avatar size={"2xl"} shape={"squared"} src={avatarUrl} />

        <Typo variant={"heading"} size={"xs"} weight={"medium"}>
          {login}
        </Typo>
      </div>

      {children}
    </Paper>
  );
}
