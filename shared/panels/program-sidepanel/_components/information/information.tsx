import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { UserGroup } from "@/shared/features/user/user-group/user-group";
import { InformationProps } from "@/shared/panels/program-sidepanel/_components/information/information.types";

export function Information({ data }: InformationProps) {
  if (!data.leads?.length) {
    return null;
  }

  return (
    <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:program.information.title" }} />

      <div className="grid grid-cols-3 gap-md">
        <div className={"flex flex-col gap-1"}>
          <Typo size={"xs"} color={"secondary"} translate={{ token: "panels:program.information.lead.title" }} />
          <UserGroup avatarProps={{ size: "s" }} users={data.leads} maxUsers={2} />
        </div>
      </div>
    </Paper>
  );
}
