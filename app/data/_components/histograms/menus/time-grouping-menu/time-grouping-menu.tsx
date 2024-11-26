import { ChevronDown, Slice } from "lucide-react";

import { TimeGroupingMenuProps } from "@/app/data/_components/histograms/menus/time-grouping-menu/time-grouping-menu.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";

import { useTimeGroupingSelectOptions } from "@/shared/hooks/select/use-time-grouping-select-options";

export function TimeGroupingMenu({ selectedTimeGrouping, onAction, relatedDateRangeType }: TimeGroupingMenuProps) {
  const timeGroupingMenu = useTimeGroupingSelectOptions({ relatedDateRangeType });

  return (
    <Menu items={timeGroupingMenu} selectedIds={[selectedTimeGrouping]} onAction={onAction} isPopOver>
      <Button
        variant={"secondary"}
        size={"xs"}
        startIcon={{ component: Slice }}
        endIcon={{ component: ChevronDown }}
        translate={{ token: `common:timeGroupingType.${selectedTimeGrouping}` }}
      />
    </Menu>
  );
}
