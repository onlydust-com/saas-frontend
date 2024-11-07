import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellLeadsProps } from "@/shared/features/table/cell/cell-leads/cell-leads.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CellLeads({ leads, ...props }: CellLeadsProps) {
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
