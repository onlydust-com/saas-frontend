import { ChevronRight, CirclePlus } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

export function AddNewBillingProfileCard({ onClick }: { onClick: () => void }) {
  return (
    <Paper
      size={"lg"}
      background={"primary-alt"}
      border="primary"
      classNames={{ base: "flex gap-md justify-between items-center" }}
      onClick={onClick}
    >
      <div className="flex items-center gap-lg">
        <Avatar
          shape="squared"
          size="lg"
          iconProps={{
            component: CirclePlus,
          }}
        />
        <Typo
          size={"sm"}
          weight="medium"
          color={"primary"}
          translate={{ token: "features:addNewBillingProfileCard.addNewBillingProfile" }}
        />
      </div>
      <Icon component={ChevronRight} />
    </Paper>
  );
}
