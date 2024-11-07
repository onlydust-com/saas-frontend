import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { Translate } from "@/shared/translation/components/translate/translate";

import { CellLeadsAvatarsProps } from "./cell-leads-avatars.types";

export function CellLeadsAvatars({ leads, ...props }: CellLeadsAvatarsProps) {
  return (
    <CellAvatar
      avatars={leads.map(lead => ({
        src: lead.avatarUrl,
        name: lead.login,
      }))}
      quantity={3}
      singleProps={{
        description: {
          children: <Translate token={"features:cell.cellLeadsAvatars.projectLead"} />,
        },
      }}
      {...props}
    />
  );
}
